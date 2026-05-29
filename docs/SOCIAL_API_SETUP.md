# Social Media API Setup Guide

This guide will help you set up API access for Instagram, YouTube, Facebook, and TikTok to automatically pull posts to your website gallery.

---

## 1. Instagram (Graph API)

### Requirements
- Facebook Business Account
- Instagram Business/Creator Account
- Facebook App

### Steps

**1. Create a Facebook Business Account**
- Go to https://business.facebook.com
- Create a business account if you don't have one

**2. Create a Facebook App**
- Go to https://developers.facebook.com
- Click "Create App"
- Select "Business" as app type
- Name it "JaeTravel Social Feed"
- Add "Instagram Graph API" product

**3. Configure Instagram Business Account**
- Link your Instagram Business/Creator account to your Facebook Page
- Go to Instagram Settings > Account > Linked accounts
- Connect to Facebook

**4. Get Access Token**
- Use Facebook Graph API Explorer: https://developers.facebook.com/tools/explorer/
- Select your app
- Request permissions: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`
- Generate token
- Exchange short-lived token for long-lived token (60 days):
```
GET https://graph.facebook.com/v18.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id={YOUR_APP_ID}&
  client_secret={YOUR_APP_SECRET}&
  fb_exchange_token={SHORT_LIVED_TOKEN}
```

**5. Add to .env.local**
```env
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_ACCOUNT_ID=your_instagram_business_account_id
```

---

## 2. YouTube (Data API v3)

### Requirements
- Google Cloud Project
- YouTube API enabled

### Steps

**1. Create Google Cloud Project**
- Go to https://console.cloud.google.com
- Create new project "JaeTravel Social Feed"

**2. Enable YouTube Data API v3**
- Go to APIs & Services > Library
- Search "YouTube Data API v3"
- Enable it

**3. Create API Credentials**
- Go to APIs & Services > Credentials
- Click "Create Credentials" > "API Key"
- Copy the API key

**4. Get Channel ID**
- Go to your YouTube channel > Advanced Settings
- Copy Channel ID (starts with UC...)

**5. Add to .env.local**
```env
YOUTUBE_API_KEY=your_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
```

---

## 3. Facebook (Graph API)

### Requirements
- Facebook Page
- Facebook App (same as Instagram, use the same app)

### Steps

**1. Get Page Access Token**
- Go to Graph API Explorer
- Select your app
- Select your Facebook Page
- Request permission: `pages_read_engagement`
- Generate token

**2. Get Page ID**
- Your Page ID is visible in your Facebook Page's "About" section
- Or use: `GET https://graph.facebook.com/v18.0/me?access_token={TOKEN}`

**3. Add to .env.local**
```env
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_ACCESS_TOKEN=your_page_access_token
```

---

## 4. TikTok API

### Requirements
- TikTok for Developers account
- TikTok App (approval required for public content)

### Important Note
TikTok's API is more restrictive. They require app review for most content access. Consider using a third-party aggregator like Walls.io for TikTok as an alternative.

### Steps (if you have TikTok for Developers access)

**1. Register as Developer**
- Go to https://developers.tiktok.com
- Create a developer account

**2. Create App**
- Create a new app
- Request content permissions

**3. Get Access Token**
- Follow OAuth 2.0 flow to get user access token
- Request scope: `video.list`

**4. Add to .env.local**
```env
TIKTOK_APP_ID=your_app_id
TIKTOK_APP_SECRET=your_app_secret
TIKTOK_ACCESS_TOKEN=your_access_token
```

---

## 5. Verify Your Setup

After adding credentials to .env.local, test the API endpoints:

```bash
# Test Instagram
curl http://localhost:3000/api/social/instagram

# Test YouTube
curl http://localhost:3000/api/social/youtube

# Test Facebook
curl http://localhost:3000/api/social/facebook

# Test TikTok
curl http://localhost:3000/api/social/tiktok

# Test combined feed
curl http://localhost:3000/api/social/feed
```

---

## Environment Variables Summary

Add these to your `.env.local`:

```env
# Instagram
INSTAGRAM_APP_ID=123456789
INSTAGRAM_APP_SECRET=abcdef123456
INSTAGRAM_ACCESS_TOKEN=EAAxxxxxxxxxxxx
INSTAGRAM_ACCOUNT_ID=17841400000000

# YouTube
YOUTUBE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxx
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxx

# Facebook
FACEBOOK_PAGE_ID=123456789
FACEBOOK_ACCESS_TOKEN=EAAxxxxxxxxxxxx

# TikTok (if available)
TIKTOK_APP_ID=123456789
TIKTOK_APP_SECRET=xxxxxxxxxxxx
TIKTOK_ACCESS_TOKEN=xxxxxx
```

---

## Cron Job Setup (Optional)

To auto-refresh social feeds periodically, set up a cron job:

```bash
# Every 6 hours
0 */6 * * * curl -X POST https://www.jaetravel.co.ke/api/social/refresh
```

Or use Vercel Cron Jobs by creating `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/social/refresh",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

---

## Troubleshooting

### Instagram
- Error 190: Token expired - refresh your access token
- Error 100: Missing permissions - re-request scopes
- Error 368: Temporarily blocked - wait and reduce API calls

### YouTube
- Error 403: API key not valid or quota exceeded
- Error 404: Channel ID not found

### Facebook
- Error 190: Access token expired
- Error 200: Need page permissions

### TikTok
- Very limited API access for personal accounts
- Consider Walls.io as alternative

---

## Need Help?

Contact me with specific error messages if you encounter issues during setup.