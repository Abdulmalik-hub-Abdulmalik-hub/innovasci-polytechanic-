# 🔧 Vercel Environment Variables Guide

## Copy and paste these in your Vercel Project Settings → Environment Variables

---

## 🚀 DEVELOPMENT Environment Variables

### 1. General Application Settings
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=InnovaSci Open Polytechnic
NEXT_PUBLIC_APP_DESCRIPTION=Premier online polytechnic platform
```

### 2. Supabase Configuration
```
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anonymous/Public Key (safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (NEVER expose publicly)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Paystack Payment Integration
```
# Paystack Public Key (safe for frontend)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxx

# Paystack Secret Key (server-side only)
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx

# Paystack Webhook Secret
PAYSTACK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

### 4. Super Admin Configuration
```
# Super Admin Email (permanent system owner)
SUPER_ADMIN_EMAIL=webuildandtarinbuilders@gmail.com

# Alternative
NEXT_PUBLIC_SUPER_ADMIN_EMAIL=webuildandtarinbuilders@gmail.com
```

### 5. Authentication
```
# NextAuth/JWT Secret
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters

# Auth Encryption Key
AUTH_ENCRYPTION_KEY=your-32-character-encryption-key
```

### 6. Email Configuration (Resend/Postmark/SendGrid)
```
# For Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# For Postmark
POSTMARK_API_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# SMTP Configuration (alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@innovasci.edu
```

### 7. File Upload & Storage
```
# Max file upload size in bytes (default: 5MB)
MAX_FILE_SIZE=5242880

# Allowed file types (comma-separated)
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf

# Cloudinary (if using for image processing)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 8. API Rate Limiting
```
API_RATE_LIMIT=100
API_TIMEOUT=30000
```

### 9. Analytics & Monitoring (Optional)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### 10. Feature Flags
```
NEXT_PUBLIC_ENABLE_PAYMENT=true
NEXT_PUBLIC_ENABLE_CBT=true
NEXT_PUBLIC_ENABLE_TRANSCRIPT=true
```

---

## 🧪 TEST Environment Variables
(Same as development but with test API keys)
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://test.your-app.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://test-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-test-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-test-service-key
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxx
```

---

## 🌐 PRODUCTION Environment Variables
(Same structure but with live API keys)
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://innovasci.edu.ng
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-key
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxx
```

---

## ⚠️ SECURITY NOTES

1. **NEVER** commit `.env` files to Git
2. **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` publicly
3. **NEVER** expose `PAYSTACK_SECRET_KEY` publicly  
4. Use different keys for development, test, and production
5. Rotate keys periodically

---

## 📋 Quick Setup Checklist

- [ ] Create Supabase project
- [ ] Get Supabase URL and keys
- [ ] Create Paystack account
- [ ] Get Paystack API keys
- [ ] Set webhook URL in Paystack dashboard
- [ ] Copy all variables to Vercel
- [ ] Redeploy application
