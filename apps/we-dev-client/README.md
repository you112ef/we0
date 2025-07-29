[![English](https://img.shields.io/badge/README-English-494cad.svg)](https://github.com/we0-dev/we0/blob/main/apps/we-dev-client/README.md) [![中文](https://img.shields.io/badge/README-中文-494cad.svg)](https://github.com/we0-dev/we0/blob/main/apps/we-dev-client/docs/README.zh.md) 

# Super big pit

When you are happy to use 'pnpm i' to install the dependency, it will definitely report an error; please follow the steps below to fix it.

- electron fix：https://github.com/pangxieju/electron-fix
- mac Configuration modifications：

```
"postinstall": "electron-rebuild -f -w node-pty --arch=arm64"
"mac": {
      "target": "dir",
      "arch": [
        "arm64"
      ]
    }
```

- windows:

# 🛠️ Windows `node-pty` Dependency Installation Guide 

<span style="color: #3498db; font-weight: 600;">⚠️ Important Notice:</span>  
This solution applies to Windows 10/11 environments

## 🚀 Visual Studio Installer Setup

### 1. [Official Download](https://visualstudio.microsoft.com/zh-hans/downloads/)

### 2. Custom Installation Path
- For existing VS installations needing path modification:
  1. Press `WIN + R` to open Registry Editor
  2. Navigate to:  
     `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\VisualStudio\Setup`
  3. Modify/Delete `SharedInstallationPath` value  
     Example: `D:\software\Microsoft\VisualStudio\Shared`

### 3. Component Selection

  - ☑️ C++ Desktop Development
  - ☑️ Python Development
  - ☑️ Python 3 64-bit
  - ☑️ MSVC v142 or newer (VS Tool Installation Interface - Single Component - Search for MSVC)
  - ☑️ CMake (Bundled version)

## 4. Configure the Python environment

* &#x20; In the Path environment variable, add python.exe path and pip.exe path

* Verify the Python environment
```bash
    python --V
    pip --V
```

## 5. Install dependencies (stable node version recommended)
* Delete the original node_modules
  ```bash
    rm -rf node_modules
    pnpm install
  ```
* If you run into peer-to-peer dependency issues
  ```bash
    pnpm install --legacy-peer-deps
  ```
## 6. The last error that pnpm install may encounter is as follows
![alt text](./docs/error.png)
  - Solution: (Find pnpm.cjs in pnpm, take the 18.18.1 node version here as an example due to the nvm management used)
  ### 🛠️ 1、View the NVM path:
  - ```bash
    nvm root
    
  ### 🛠️ 2、Locate this file：
  - C:\Users\13906\AppData\Roaming\nvm\v18.18.1\node_modules\pnpm\bin\pnpm.cjs
    <span style="color: #3498db; font-weight: 600;">⚠️ 注意：</span> ：nvm前面的地址以你实际本机nvm的具体路径为主件
  
  ###  🛠️ 3、Modify the content of the first line of code in the file.:
    --Original：#!/usr/bin/env node
    --Modified: #!node
```

# نشر we-dev-client على Cloudflare Pages وربطه مع backend على Docker

## الخطوات بالعربية:
1. **ارفع كود الواجهة إلى GitHub.**
2. **أنشئ مشروع جديد في Cloudflare Pages واربطه بالريبو.**
3. **حدد build command:**
   - `pnpm build` أو `npm run build`
   - output directory: `dist`
4. **أضف متغير البيئة VITE_API_BASE_URL في إعدادات Cloudflare Pages:**
   - اجعله يشير إلى عنوان backend (مثلاً: `https://api.yourdomain.com`)
5. **انشر المشروع.**

## English Steps:
1. **Push your frontend code to GitHub.**
2. **Create a new Cloudflare Pages project and link it to your repo.**
3. **Set build command:**
   - `pnpm build` or `npm run build`
   - output directory: `dist`
4. **Add the environment variable VITE_API_BASE_URL in Cloudflare Pages settings:**
   - Set it to your backend URL (e.g., `https://api.yourdomain.com`)
5. **Deploy the project.**