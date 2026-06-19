# 🎬 Video Hover Preview Setup

**Even better idea!** Your video projects now show actual **video previews** on hover instead of static images! 🔥

---

## ✅ What I Just Updated

### 1. **Works.jsx Component**
✅ Desktop hover now plays **actual video** for video projects  
✅ Mobile preview shows **looping video** for video projects  
✅ Dev projects still show static images (as expected)  
✅ Auto-play, loop, muted for smooth UX

### 2. **constants/index.js**
✅ Added `video:` field to all 4 video projects  
✅ Points to `/assets/videos/[project-name].mp4`

### 3. **Created Videos Directory**
✅ `/public/assets/videos/` folder ready for your video files

---

## 📥 How to Download Your Instagram Reels

### **Option 1: Online Downloader (Easiest)**

**Use: https://igram.io** (no signup needed)

1. **Copy your reel URLs:**
   ```
   https://www.instagram.com/reel/CsCKDtUJGo2/
   https://www.instagram.com/reel/CqQzDikJRQj/
   https://www.instagram.com/reel/Coi6VfvuGDq/
   https://www.instagram.com/reel/C0VtaMVM0iF/
   ```

2. **Paste each URL into igram.io**

3. **Click "Download"** → Choose **720p or 1080p MP4**

4. **Rename downloaded files:**
   - `barbershop-promo.mp4`
   - `club-event.mp4`
   - `womens-basketball.mp4`
   - `mens-basketball.mp4`

5. **Move to your portfolio:**
   ```bash
   mv ~/Downloads/barbershop-promo.mp4 /home/solom/Projects/Awwwards-Portfolio/public/assets/videos/
   mv ~/Downloads/club-event.mp4 /home/solom/Projects/Awwwards-Portfolio/public/assets/videos/
   mv ~/Downloads/womens-basketball.mp4 /home/solom/Projects/Awwwards-Portfolio/public/assets/videos/
   mv ~/Downloads/mens-basketball.mp4 /home/solom/Projects/Awwwards-Portfolio/public/assets/videos/
   ```

---

### **Option 2: Using yt-dlp (Command Line)**

Install yt-dlp (if not already):
```bash
pip install yt-dlp
```

Download all 4 reels:
```bash
cd /home/solom/Projects/Awwwards-Portfolio/public/assets/videos

# Barbershop Promo
yt-dlp -o barbershop-promo.mp4 https://www.instagram.com/reel/CsCKDtUJGo2/

# Club Event
yt-dlp -o club-event.mp4 https://www.instagram.com/reel/CqQzDikJRQj/

# Women's Basketball
yt-dlp -o womens-basketball.mp4 https://www.instagram.com/reel/Coi6VfvuGDq/

# Men's Basketball
yt-dlp -o mens-basketball.mp4 https://www.instagram.com/reel/C0VtaMVM0iF/
```

---

### **Option 3: Browser Extension**

Use Chrome/Firefox extension:
- **Download: https://chrome.google.com/webstore** search "Instagram Video Downloader"
- Open each reel in browser
- Click extension icon → Download

---

## 📂 Final File Structure

Once you download the videos, your structure should look like:

```
/public/assets/
├── videos/
│   ├── barbershop-promo.mp4      ✅ (download from Instagram)
│   ├── club-event.mp4             ✅ (download from Instagram)
│   ├── womens-basketball.mp4      ✅ (download from Instagram)
│   └── mens-basketball.mp4        ✅ (download from Instagram)
│
└── projects/
    ├── captainfunds.jpg           ✅ (already uploaded)
    ├── velare.jpg                 ✅ (already uploaded)
    ├── suburbia.jpg               ✅ (already uploaded)
    ├── cinemaverse.jpg            ✅ (already uploaded)
    ├── barbershop-promo.jpg       ⚠️ (optional thumbnail fallback)
    ├── club-event.jpg             ⚠️ (optional thumbnail fallback)
    ├── womens-basketball.jpg      ⚠️ (optional thumbnail fallback)
    └── mens-basketball.jpg        ⚠️ (optional thumbnail fallback)
```

---

## 🎥 Video Optimization (Optional but Recommended)

If videos are too large (>5MB), compress them:

### Using FFmpeg:
```bash
cd /home/solom/Projects/Awwwards-Portfolio/public/assets/videos

# Compress each video to ~2-3MB
ffmpeg -i barbershop-promo.mp4 -vcodec h264 -crf 28 -preset fast barbershop-promo-compressed.mp4
ffmpeg -i club-event.mp4 -vcodec h264 -crf 28 -preset fast club-event-compressed.mp4
ffmpeg -i womens-basketball.mp4 -vcodec h264 -crf 28 -preset fast womens-basketball-compressed.mp4
ffmpeg -i mens-basketball.mp4 -vcodec h264 -crf 28 -preset fast mens-basketball-compressed.mp4

# Replace originals with compressed versions
mv barbershop-promo-compressed.mp4 barbershop-promo.mp4
mv club-event-compressed.mp4 club-event.mp4
mv womens-basketball-compressed.mp4 womens-basketball.mp4
mv mens-basketball-compressed.mp4 mens-basketball.mp4
```

### Using Online Tool:
- https://www.freeconvert.com/video-compressor
- Upload → Compress → Download

**Target size:** 2-5MB per video (good balance of quality and load time)

---

## 🚀 How It Works Now

### **Desktop Experience:**
1. User hovers over video project name
2. **Floating video preview appears** (auto-plays, loops, muted)
3. Video follows mouse cursor
4. Smooth GSAP animations

### **Mobile Experience:**
1. User scrolls to project
2. **Video plays inline** (auto-play, loop, muted)
3. Full-width responsive view

### **Dev Projects (Captain Funds, Velare, etc.):**
- Still show **static images** (perfect for websites/apps)
- No video needed for these

---

## ✅ Why This is Awesome

**Before:** Static screenshots of your video work (boring)  
**After:** Actual video previews playing on hover (🔥)

**Benefits:**
- ✨ More engaging portfolio
- 🎬 Shows your video work in action
- 💪 Demonstrates technical skill (video optimization)
- 📱 Works on mobile too
- ⚡ Auto-plays on hover (no clicking needed)

---

## 🎯 Quick Start Commands

**All-in-one download script** (after you download manually):

```bash
# Move all downloaded videos at once
cd ~/Downloads
mv barbershop-promo.mp4 club-event.mp4 womens-basketball.mp4 mens-basketball.mp4 \
   /home/solom/Projects/Awwwards-Portfolio/public/assets/videos/

# Verify they're there
ls -lh /home/solom/Projects/Awwwards-Portfolio/public/assets/videos/
```

---

## 🐛 Troubleshooting

**Videos not playing?**
- Check file names match exactly (case-sensitive)
- Verify MP4 format (not MOV or other)
- Check file size (<10MB recommended)
- Clear browser cache and refresh

**Videos too large/slow?**
- Compress using FFmpeg (see above)
- Use online compressor
- Target 2-5MB per video

**Video plays but looks bad?**
- Re-download at higher quality (1080p)
- Don't over-compress (CRF 28 is good balance)

---

**Once you download those 4 Instagram reels and drop them in `/public/assets/videos/`, your portfolio will have interactive video hover previews! 🎬✨**

