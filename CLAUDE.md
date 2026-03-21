# Bottle Finder — Design Rules

## DO
- Light, minimal, clean, modern design — shadcn aesthetic
- Neutral palette (whites, grays, one subtle warm stone/amber accent color)
- Good typography hierarchy, plenty of whitespace
- Font: Use Inter from Google Fonts
- Mobile responsive
- Light motion: scroll animations via IntersectionObserver, smooth transitions, subtle hover

## DON'T
- NO bright saturated gradients or gradient text
- NO emoji icons (use Lucide icons)
- NO "revolutionary", "game-changing" marketing copy
- NO heavy shadows or busy patterns
- NO dark mode
- NO border-radius > rounded-2xl
- NO cramped spacing or tiny fonts (< 14px)

## Stack
- Single HTML files (index.html, admin.html)
- Tailwind CSS CDN
- Lucide Icons CDN
- Inter font from Google Fonts
- No build process

## Deployment
- Netlify (static)
- GitHub repo: bottle-finder
