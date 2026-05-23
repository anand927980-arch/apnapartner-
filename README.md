# Apna Partner - Jharkhand Ka Apna, Pyar Ka Sapna

Yeh ek Next.js 15 aur Firebase par adharit dating app hai, jo khaas taur par Jharkhand ke liye banaya gaya hai.

## GitHub par code kaise daalein?

Apne code ko GitHub par save karne ke liye terminal mein niche diye gaye steps follow karein:

1. GitHub par ek naya repository banayein: [Create New Repo](https://github.com/new)
2. Terminal kholiye aur yeh commands run kijiye:

```bash
# Git initialize karein
git init

# Saari files add karein
git add .

# Pehla commit karein
git commit -m "Initial commit for Apna Partner app"

# GitHub link connect karein (URL badal lein)
git remote add origin https://github.com/YOUR_USERNAME/apna-partner.git

# Main branch set karein
git branch -M main

# Code push karein
git push -u origin main
```

## Public Deployment (Firebase App Hosting)

App ko internet par live karne ke liye:

1. [Firebase Console](https://console.firebase.google.com/) mein jayein.
2. **Build > App Hosting** par click karein.
3. "Get Started" dabayein aur apna GitHub repository connect karein.
4. Firebase automatically build shuru kar dega.
5. Deployment khatam hone par aapko ek public URL milega (jaise `apna-partner-ba818.web.app`).

## Features
- Tinder-like Swipe Cards (Like/Nope)
- Geolocation based Discovery (50km radius)
- Real-time Mutual Matching
- Real-time Chat
- AI Bio Writer & Conversation Starter
- PWA Support (Mobile par install karne ke liye)

## Developed By
Firebase Studio AI Assistant
```