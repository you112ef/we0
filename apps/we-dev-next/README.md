# نشر we-dev-next كـ Backend على Docker وربطه مع Cloudflare Pages

## الخطوات بالعربية:
1. **ابنِ صورة Docker:**
   ```bash
   cd apps/we-dev-next
   docker build -t we-dev-backend .
   ```
2. **شغل الحاوية:**
   ```bash
   docker run -d -p 3000:3000 --env-file .env we-dev-backend
   ```
3. **تأكد أن المنفذ 3000 مفتوح على السيرفر.**
4. **استخدم عنوان السيرفر في متغير VITE_API_BASE_URL في Cloudflare Pages.**

## English Steps:
1. **Build Docker image:**
   ```bash
   cd apps/we-dev-next
   docker build -t we-dev-backend .
   ```
2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 --env-file .env we-dev-backend
   ```
3. **Make sure port 3000 is open on your server.**
4. **Set your server URL in VITE_API_BASE_URL in Cloudflare Pages.**