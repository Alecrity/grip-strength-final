# Grip Strength Challenge

Competition tracker for Universal Truck Service trade shows.

## 📁 Files Included

### Backend (Deploy to Railway)
- `server.js` - Main API server
- `package.json` - Node.js dependencies
- `public/index.html` - API status page
- `public/staff.html` - Staff interface for entering scores
- `public/leaderboard.html` - Live leaderboard display
- `public/popup.js` - Registration popup (embed on WordPress)

### WordPress Landing Page
- `wordpress-landing-page.html` - Copy into WordPress (HTML block)

---

## 🚀 DEPLOYMENT INSTRUCTIONS

### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo" (or upload directly)
3. Upload the following files:
   - `server.js`
   - `package.json`
   - `public/` folder (with all files inside)
4. Add a PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
5. Railway will auto-detect Node.js and deploy
6. Get your app URL (e.g., `https://grip-strength-challenge.railway.app`)

### Step 2: Update popup.js

After deploying, update line 7 in `popup.js`:
```javascript
const API_BASE = 'https://YOUR-RAILWAY-APP-URL.railway.app/api';
```

### Step 3: Add WordPress Landing Page

1. In WordPress, create a new page
2. Add a "Custom HTML" block
3. Paste the entire contents of `wordpress-landing-page.html`
4. Update the image placeholders:
   - Replace `REPLACE_WITH_HYUNDAI_MAIN_IMAGE_URL` with actual image URLs
   - Replace `REPLACE_WITH_HYUNDAI_SMALL_IMAGE_1_URL` etc.
   - Replace `REPLACE_WITH_AUTOCAR_MAIN_IMAGE_URL` etc.
5. Update the leaderboard iframe:
   - Replace `[LEADERBOARD IFRAME WILL GO HERE]` with:
   ```html
   <iframe src="https://YOUR-RAILWAY-URL/leaderboard"></iframe>
   ```

### Step 4: Add Registration Popup (Optional)

To add the popup to your WordPress site:
1. Upload `popup.js` to your media library or hosting
2. Add this script to your page/theme:
```html
<script src="https://YOUR-RAILWAY-URL/popup.js"></script>
```

---

## 🔗 URLs After Deployment

| Page | URL |
|------|-----|
| API Status | `https://YOUR-APP.railway.app/` |
| Staff Interface | `https://YOUR-APP.railway.app/staff` |
| Leaderboard | `https://YOUR-APP.railway.app/leaderboard` |
| Export CSV | `https://YOUR-APP.railway.app/api/export-csv` |

---

## 💰 Prizes

- 🥇 1st Place: $200 Visa Card
- 🥈 2nd Place: $100 Visa Card  
- 🥉 3rd Place: $50 Visa Card

---

## 📱 Featured Equipment

1. **2025 Hyundai HT100V** - Track Skid Steer - $54,995
2. **2025 Autocar XPERT ACMD** - Roll-Off Truck - $159,990

---

## ❓ Support

Contact your developer for assistance.
