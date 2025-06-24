# 🚀 Deploy SWP Backend to Render

## 📋 **Prerequisites**

- Git repository (GitHub/GitLab)
- Render account (free): https://render.com

## 🗄️ **Step 1: Create PostgreSQL Database**

1. **Login to Render Dashboard**: https://dashboard.render.com
2. **Create new PostgreSQL**:
   - Click "New" → "PostgreSQL"
   - Name: `swp-database`
   - User: `swp_user`
   - Database: `swp_db`
   - Region: Choose closest to your users
   - Instance Type: **Free** (for development)
   - Click "Create Database"

3. **Get Database URL**:
   - Wait for database to be ready (2-3 minutes)
   - Copy the **Internal Database URL** (starts with `postgresql://`)
   - Save this for Step 3

## 🚀 **Step 2: Deploy Backend Service**

1. **Create Web Service**:
   - Click "New" → "Web Service"
   - Connect your Git repository
   - Select the repository containing your project

2. **Configure Service**:
   - **Name**: `swp-backend`
   - **Environment**: `Java`
   - **Region**: Same as your database
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `backend`
   - **Build Command**: `./build.sh`
   - **Start Command**: `./start.sh`
   - **Instance Type**: **Free**

3. **Environment Variables**:
   Click "Advanced" → "Environment Variables" and add:

   ```
   DATABASE_URL=postgresql://[paste from Step 1]
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=your-secret-key-change-this-in-production
   FRONTEND_URL=https://your-frontend-domain.com
   ```

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

## ✅ **Step 3: Verify Deployment**

1. **Check Service Status**:
   - Go to your service dashboard
   - Status should be "Live" (green)

2. **Test API Endpoints**:
   ```bash
   # Replace with your actual Render URL
   BACKEND_URL=https://swp-backend.onrender.com

   # Test health check
   curl $BACKEND_URL/api/users

   # Test Swagger UI
   open $BACKEND_URL/swagger-ui.html
   ```

3. **Create Admin User** (if needed):
   ```bash
   curl -X POST $BACKEND_URL/api/users/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "admin@hospital.com",
       "password": "admin123",
       "fullName": "System Administrator",
       "role": "ADMIN"
     }'
   ```

## 🌐 **Step 4: Update Frontend**

Update your frontend API base URL to point to Render:

```typescript
// src/services/config.ts
export const API_BASE_URL = 'https://swp-backend.onrender.com/api'
```

## 📊 **Important URLs After Deployment**

- **Backend API**: `https://your-service-name.onrender.com/api`
- **Swagger UI**: `https://your-service-name.onrender.com/swagger-ui.html`
- **API Docs**: `https://your-service-name.onrender.com/api-docs`
- **Database**: Accessible via Render dashboard

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Build Failed**:
   - Check build logs in Render dashboard
   - Ensure Java 17+ is available
   - Verify Maven dependencies

2. **Database Connection Failed**:
   - Verify DATABASE_URL format
   - Check database status in dashboard
   - Ensure same region for DB and service

3. **CORS Errors**:
   - Update FRONTEND_URL environment variable
   - Check CORS configuration in application-prod.properties

4. **Service Won't Start**:
   - Check start command: `./start.sh`
   - Verify file permissions
   - Check environment variables

### **Debug Commands:**

```bash
# Check service logs
# Go to Render dashboard → Your service → Logs

# Test specific endpoints
curl -X GET https://your-service.onrender.com/api/users
curl -X POST https://your-service.onrender.com/api/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 💰 **Cost Breakdown (Free Tier)**

- **PostgreSQL Database**: Free (1GB storage, 1 month retention)
- **Web Service**: Free (750 hours/month, sleeps after 15min inactivity)
- **Bandwidth**: 100GB/month free

## 🔄 **Auto-Deploy Setup**

Enable automatic deployments:
1. Go to service settings
2. Enable "Auto-Deploy"
3. Every push to main branch will trigger deployment

## 📈 **Next Steps**

1. **Custom Domain**: Add your domain in Render dashboard
2. **SSL Certificate**: Automatic with custom domains
3. **Environment Separation**: Create separate services for staging/prod
4. **Monitoring**: Set up health checks and alerts
5. **Backup**: Configure database backups

## 🎉 **Success!**

Your SWP Backend is now live on Render! 

- Backend API: `https://your-service.onrender.com/api`
- Swagger UI: `https://your-service.onrender.com/swagger-ui.html`

Happy coding! 🚀 