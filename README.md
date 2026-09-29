# Hamza Faisal · Portfolio

Personal portfolio for Hamza Faisal, full stack engineer (real-time systems & IoT analytics).

Built with React 19, Vite, Tailwind CSS 4, Three.js (React Three Fiber), GSAP and Motion.
Started from the JS Mastery 3D portfolio template; all content, the Selected Work bento grid,
the IoT architecture diagram (Magic UI Animated Beam) and the experience timeline (Aceternity Timeline)
are custom.
The hero background is ThreeUI's Warp Field (MIT, Meng To — github.com/MengTo/threeui).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit content

Everything text-based lives in `src/constants/index.js`: profile links, stats, projects,
experience, skills, research. The resume served by the site is `public/Hamza-Faisal-Resume.pdf`.

## Contact form

The form sends through EmailJS when these are set in a `.env` file (never commit it):

```
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

Without them, the form falls back to opening the visitor's email client.

## Deploy

Works on Vercel or Netlify out of the box: build command `npm run build`, output `dist`.
