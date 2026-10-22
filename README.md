# Forma

An interactive 3D lounge chair configurator built with React, TypeScript and Three.js. Customize the chair, explore itemized pricing, save designs locally and share options through a portable URL. This is a fictional portfolio demo with no payments or backend.

- **GitHub:** TODO � add repository URL after upload.
- **Live demo:** TODO � add Netlify URL after deployment.
- [Full project README](forma/README.md)
- [Interview walkthrough](forma/INTERVIEW.md)

## Quick start (Windows PowerShell)

Requires Node.js 22.12+; Node 24 LTS recommended.

```powershell
cd forma
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:5187/. Run checks inside `forma`:

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

The source, tests and lockfile live in `forma/`; the Netlify configuration lives at this repository root. No environment variables are required. See the full README for features, verification limits and deployment instructions.

## Verified checks

Type checking passed; all 9 tests in 2 files passed; production build passed. Vite reported a bundle-size warning. Browser visual, touch, mobile and PNG-content checks remain unverified because browser automation was unavailable.

## Publishing status

Prepared locally only. No GitHub repository has been created, no code pushed and no Netlify deployment started. Confirm the destination and visibility before publishing.
