# Forma

A fictional, browser-only lounge chair configurator built for a computer science portfolio. No checkout, backend, purchased assets, external models, or paid services. This project lives entirely in `forma/` and does not share state, dependencies, or ports with CareerTrack or StockFlow.

## Project links

- **GitHub:** TODO — add repository URL after upload.
- **Live demo:** TODO — add Netlify URL after deployment.

## Technologies

React 19, TypeScript, Three.js, React Three Fiber, Drei, Tailwind CSS v4, Vite and Vitest. Static hosting on Netlify; localStorage for saved designs. No environment variables are required, so an `.env.example` is not applicable. Never put secrets in client-side Vite variables.

## Windows setup

Install Node.js 22.12+ (Node 24 LTS recommended), then in PowerShell:

```powershell
cd "C:\Users\Owner\Downloads\project 3\forma"
npm.cmd ci
npm.cmd run dev
```

Open **http://localhost:5187/**. The strict default port prevents silently taking another project's port. Choose another explicitly with `npm.cmd run dev -- --port 5197`. Production preview: `npm.cmd run build`, then `npm.cmd run preview` at http://localhost:4187/.

## Features and controls

- Procedural rounded cushions, reclined backrest, padded arms, exposed frame and tapered legs; matching optional ottoman.
- Four upholstery colors, woven fabric/leather, oak/walnut or graphite/brushed steel legs. Deterministic procedural bump textures, physical lighting and shadows.
- Drag to orbit; mouse wheel or two-finger pinch to zoom. Front, side, rear and reset buttons move the camera. Auto rotation pauses during interaction and resumes after a short delay. Reduced-motion preference disables auto rotation and uses immediate camera presets.
- Price breakdown in USD. Base $649; leather +$180; metal +$45 or walnut +$35; ottoman +$229. All arithmetic uses integer cents; taxes/shipping are outside this fictional demo.
- Name, save, load and delete up to 30 local designs. Local storage remains in the same browser and origin; private browsing or clearing storage may remove it.
- Share generates a versioned URL with all selected options. It does not require saved designs. Clipboard denial exposes a selectable link field. Unknown/outdated option values fall back to supported defaults with a notice.
- PNG downloads use the actual WebGL canvas with its drawing buffer preserved, including the configured chair, lighting and background. Interface controls are excluded.
- Responsive showroom, native controls, pressed states, visible focus, accessible names and live feedback. The mobile viewer stays visible while controls scroll.

## Architecture

`src/config.ts` owns configuration validation, price items, URL serialization and storage helpers. `src/main.tsx` owns application state and accessible DOM controls. `src/Viewer.tsx` owns the React Three Fiber scene, procedural textures/materials, OrbitControls, presets and rendering fallback. `src/style.css` uses Tailwind CSS v4 plus showroom-specific styling. Vite produces a static `dist/`.

See [INTERVIEW.md](INTERVIEW.md) for an interview walkthrough.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

Unit tests cover pricing, URL round trips, malformed/outdated links, save/read/delete behavior, corrupt storage and validation. Verified during publication preparation: `npm run typecheck` passed and `npm test` passed all 9 tests across 2 files. `npm run build` also passed. Vite reported a bundle-size warning (about 1.14 MB JavaScript / 320 KB gzip); this is a warning, not a build failure. Browser automation was unavailable (no browser registered; opening the in-app browser returned unavailable). **Visual appearance, actual touch/orbit interaction, mobile layout, sharing in a second browser, and exported PNG product pixels have not been visually verified.**

Manual checklist:
1. Drag and zoom; try all presets, auto rotation, Reset view and OS reduced motion.
2. Select every color/finish and leg material. Toggle ottoman; check the geometry and itemized total.
3. Save two named designs, reload, load each and delete one.
4. Share, open the URL in a second browser/private window and confirm identical options. Try `?v=9&color=invalid` and confirm the notice.
5. Download PNG; open it and confirm the chair and optional ottoman are present, with no blank canvas.
6. Test a narrow phone viewport and real touch device. Tab through all controls and check focus visibility.
7. Disable WebGL to see the static illustration; pricing/storage should still work. Simulate context loss with browser developer tools and check the reload message.

## GitHub upload (after destination and visibility confirmation)

Use the parent `project 3` folder as the repository root so both `forma/` and the root `netlify.toml` are included. Create an empty GitHub repository with the confirmed owner, name and visibility; do not initialize it with a README, license or gitignore. For HTTPS, Git Credential Manager opens a browser sign-in when needed. Complete authentication there; never paste passwords or tokens into chat.

After a local commit exists, inspect `git remote -v` and `git branch --show-current`. If there is no `origin`, add the confirmed repository URL with `git remote add origin https://github.com/OWNER/REPOSITORY.git`. If `origin` already exists, preserve it and verify the destination before changing anything. Push the current branch using `git push -u origin HEAD`. Do not force push.

## Netlify automatic deployments (after GitHub upload)

Nothing has been deployed or uploaded. After confirming the deployment destination and access, sign in to Netlify, choose **Add new project > Import an existing project > GitHub**, authorize access to the chosen repository and select it. Choose the branch that was pushed. The inspected root `netlify.toml` defines these settings:

| Setting | Value |
| --- | --- |
| Base directory | `forma` |
| Build command | `npm run build` |
| Publish directory | `dist` (relative to base; repository path `forma/dist`) |
| Node version | `24` |

Leave the optional package directory unset. Review the settings before clicking Deploy. Once connected, pushes to the production branch trigger deployments. Verify the resulting site and replace the GitHub/live-demo placeholders in both READMEs. No environment variables, functions or secrets are required. URL configuration uses query parameters, so no SPA path rewrites are needed. Use the committed lockfile with `npm ci`.

## Known limitations

The chair is an artistic procedural approximation, not a manufacturing model. Fabric/leather effects are approximate; no downloaded HDR environments or photoreal textures. Bundle includes Three.js and is relatively large; first load is heavier than a conventional landing page. Rendering is on demand when idle; optional auto rotation deliberately renders continuously. DPR is capped at 1.5 and shadows at 1024px. The WebGL drawing buffer is preserved for reliable export, trading some GPU efficiency for export correctness. Context loss retains the configurator but requires reload to restart 3D. PNG exports the current camera at viewer resolution, not print resolution. No undo for deleting saved designs. No cloud sync. Browser GPU/driver support varies.




## Local Git commit

Run from the parent `project 3` directory. Install Git for Windows first if `git --version` is unavailable; reopen PowerShell after installation. If `git rev-parse --show-toplevel` succeeds, keep that repository, history, branch and remotes. Only initialize a repository when no parent or local repository exists:

```powershell
git init -b main
```

Check `git config user.name` and `git config user.email`. If absent, set your actual name and preferred commit email for this repository only (a GitHub noreply email is fine):

```powershell
git config user.name "YOUR NAME"
git config user.email "YOUR COMMIT EMAIL"
git add .gitignore README.md netlify.toml forma
git diff --cached --stat
git diff --cached --check
git commit -m "Prepare Forma portfolio configurator for GitHub and Netlify"
git status --short --branch
```

Review the staged file list before committing: source code, tests, documentation, configuration and `package-lock.json` should be present; `node_modules`, `dist`, `.env`, logs and `*.tsbuildinfo` should be absent. These steps prepare only a local commit. Wait for destination and visibility confirmation before adding a remote or pushing.

References: [GitHub: adding locally hosted code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github), [Netlify: repository deployment](https://docs.netlify.com/start/quickstarts/deploy-from-repository/), [Netlify: build directories](https://docs.netlify.com/build/configure-builds/overview/).
