#!/usr/bin/env node

/**
 * SWP Development Startup Script (Cross-platform Node.js)
 * Starts both backend and frontend simultaneously
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Cross-platform command helpers
const isWindows = os.platform() === 'win32';
const cmdPrefix = isWindows ? ['cmd', '/c'] : ['sh', '-c'];

// Logging functions
const log = {
  info: (msg) => console.log(`${colors.green}[INFO]${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  dev: (msg) => console.log(`${colors.blue}[DEV]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.cyan}[SUCCESS]${colors.reset} ${msg}`)
};

// Check if command exists
function commandExists(command) {
  return new Promise((resolve) => {
    const cmd = isWindows ? 'where' : 'which';
    exec(`${cmd} ${command}`, (error) => {
      resolve(!error);
    });
  });
}

// Check prerequisites
async function checkPrerequisites() {
  log.info('Checking prerequisites...');
  
  const requirements = ['java', 'mvn', 'node', 'npm'];
  const missing = [];
  
  for (const cmd of requirements) {
    if (!(await commandExists(cmd))) {
      missing.push(cmd);
    }
  }
  
  if (missing.length > 0) {
    log.error(`Missing requirements: ${missing.join(', ')}`);
    log.error('Please install the missing tools and try again.');
    process.exit(1);
  }
  
  log.success('✅ All prerequisites are met!');
}

// Create logs directory
function createLogsDir() {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

// Kill processes on specific ports
function killProcessOnPort(port) {
  return new Promise((resolve) => {
    const killCmd = isWindows 
      ? `for /f "tokens=5" %a in ('netstat -aon ^| findstr :${port}') do taskkill /F /PID %a`
      : `lsof -ti:${port} | xargs kill -9`;
    
    exec(killCmd, () => resolve()); // Ignore errors
  });
}

// Install dependencies
async function installDependencies() {
  log.info('Installing dependencies...');
  
  if (!fs.existsSync('node_modules')) {
    log.dev('Installing frontend dependencies...');
    await runCommand('npm install');
  } else {
    log.dev('Frontend dependencies already installed');
  }
}

// Run command with promise
function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const child = spawn(cmd, args, {
      stdio: options.silent ? 'ignore' : 'inherit',
      shell: true,
      ...options
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

// Start backend service
function startBackend() {
  return new Promise((resolve, reject) => {
    log.dev('Starting Spring Boot backend...');
    
    const backendLog = path.join('logs', 'backend.log');
    const logStream = fs.createWriteStream(backendLog, { flags: 'w' });
    
    const backend = spawn('mvn', ['spring-boot:run'], {
      cwd: 'backend',
      stdio: ['ignore', logStream, logStream],
      shell: true
    });
    
    // Store PID for cleanup
    fs.writeFileSync(path.join('logs', 'backend.pid'), backend.pid.toString());
    
    backend.on('error', reject);
    
    log.success(`✅ Backend started with PID: ${backend.pid}`);
    resolve(backend);
  });
}

// Start frontend service
function startFrontend() {
  return new Promise((resolve, reject) => {
    log.dev('Starting React frontend...');
    
    const frontendLog = path.join('logs', 'frontend.log');
    const logStream = fs.createWriteStream(frontendLog, { flags: 'w' });
    
    const frontend = spawn('npm', ['run', 'dev'], {
      stdio: ['ignore', logStream, logStream],
      shell: true
    });
    
    // Store PID for cleanup
    fs.writeFileSync(path.join('logs', 'frontend.pid'), frontend.pid.toString());
    
    frontend.on('error', reject);
    
    log.success(`✅ Frontend started with PID: ${frontend.pid}`);
    resolve(frontend);
  });
}

// Wait for service to be ready
function waitForService(url, name, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const checkHealth = () => {
      attempts++;
      
      exec(`curl -s ${url}`, (error) => {
        if (!error) {
          log.success(`✅ ${name} is ready!`);
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error(`${name} failed to start after ${maxAttempts} attempts`));
        } else {
          process.stdout.write('.');
          setTimeout(checkHealth, 2000);
        }
      });
    };
    
    log.dev(`Waiting for ${name} (${url})...`);
    checkHealth();
  });
}

// Cleanup function
function cleanup() {
  log.warn('Shutting down services...');
  
  const pidFiles = ['backend.pid', 'frontend.pid'];
  
  pidFiles.forEach(pidFile => {
    const pidPath = path.join('logs', pidFile);
    if (fs.existsSync(pidPath)) {
      try {
        const pid = fs.readFileSync(pidPath, 'utf8').trim();
        if (isWindows) {
          exec(`taskkill /F /PID ${pid}`, () => {});
        } else {
          exec(`kill -TERM ${pid}`, () => {});
        }
        fs.unlinkSync(pidPath);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });
  
  log.info('Services stopped');
  process.exit(0);
}

// Main function
async function main() {
  console.log('🚀 Starting SWP Development Environment...\n');
  
  try {
    // Setup
    await checkPrerequisites();
    createLogsDir();
    
    // Cleanup existing processes
    log.info('Cleaning up existing processes...');
    await killProcessOnPort(8080);
    await killProcessOnPort(5173);
    
    // Install dependencies
    await installDependencies();
    
    // Start services
    const backend = await startBackend();
    const frontend = await startFrontend();
    
    // Wait for services to be ready
    log.info('Waiting for services to start...');
    await waitForService('http://localhost:8080/actuator/health', 'Backend');
    await waitForService('http://localhost:5173', 'Frontend');
    
    // Success message
    console.log('\n🎉 =============================================');
    console.log('🎉 SWP Development Environment is ready!');
    console.log('🎉 =============================================\n');
    console.log('📍 Frontend:      http://localhost:5173');
    console.log('📍 Backend API:   http://localhost:8080');
    console.log('📍 API Docs:      http://localhost:8080/swagger-ui.html');
    console.log('📍 Actuator:      http://localhost:8080/actuator/health\n');
    console.log('📋 Logs:');
    console.log('   Backend:       tail -f logs/backend.log');
    console.log('   Frontend:      tail -f logs/frontend.log\n');
    console.log('⚡ Press Ctrl+C to stop all services\n');
    
    // Handle cleanup on exit
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    
    // Keep process alive
    await new Promise(() => {});
    
  } catch (error) {
    log.error(`Failed to start development environment: ${error.message}`);
    cleanup();
  }
}

// Run main function
if (require.main === module) {
  main();
} 