# PharmaChain Dashboard (Demo)

This is a small demo React app (Vite) containing a PharmaChain IoT + Blockchain dashboard component.

What I added:
- Vite + React project files
- `src/App.jsx` — your dashboard component with syntax fixes
- `src/main.jsx` — app entry
- `index.html` — includes Tailwind CDN for quick styling
- `package.json` — dependency manifest
- `src/styles.css` — small base CSS

How to run (Windows PowerShell):

```powershell
npm install; npm run dev
```

Open the address shown by Vite (usually http://localhost:5173).

Notes:
- Tailwind is loaded via CDN for quick dev/demo. For production, integrate Tailwind properly.
- I fixed string/template literal bugs in `DataStore.addIoTReading` and `DataStore.addTransaction`.
- Analytics averages are guarded from divide-by-zero.

If you want, I can:
- Add TypeScript, testing, or Tailwind build integration
- Split the component into smaller files
- Wire real backend endpoints (mocked currently)
