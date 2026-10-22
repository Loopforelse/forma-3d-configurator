# Interview walkthrough

## The problem and experience

Forma demonstrates a complete frontend product experience: procedural 3D, predictable state, transparent pricing, persistence and portable configurations. It is intentionally fictional. The showroom and controls remain side by side on desktop; a compact sticky viewer keeps the chair visible on mobile.

## Scene construction

The chair is built from code: rounded boxes form a seat cushion, reclined back cushion, upholstered arms and structural rails; tapered cylinders form splayed legs. The ottoman reuses the same upholstery and frame materials. Its position fits within the camera limits. Directional, hemisphere and ambient lights illuminate the model; real shadow maps anchor it to a neutral ground. No network asset loading is necessary.

Fabric and wood use deterministic canvas-generated bump maps. Fabric has a tight crossweave and high roughness. Leather removes the weave and lowers roughness. Wood has grain and no metalness; steel increases metalness. Materials are memoized across meshes and disposed when replaced; textures are disposed on scene teardown. React Three Fiber manages declarative geometry disposal.

## Application state

A single typed Config object drives both the 3D scene and the DOM summary. There is no separate material state that can diverge from pricing. Changing wood/metal also picks a valid default finish. Saved designs clone their configuration, so later edits cannot mutate a stored selection. UI state (camera, rotation, messages and draft name) stays separate from product options.

## Pricing

A pure function emits itemized rows in integer cents. Total is a sum of those rows. Currency formatting happens only at presentation time through Intl.NumberFormat. Tests check base pricing, material and leg premiums, ottoman pricing and the walnut exception. This avoids floating point dollar accumulation errors and makes the price model reviewable.

## URL contract

The share link encodes explicit, readable parameters with schema version 1. It includes color, material, leg type, finish and ottoman. Restore validates every enum and leg/finish compatibility. Unsupported values use safe defaults with a message; links are portable because no local ID is required. Versioning leaves room for migrations if the fictional catalog changes. Query values never become markup or executable code.

## Persistence

The browser storage key is versioned. Reads catch malformed JSON and storage exceptions; validated records are capped at 30. Writes catch quota/security failures and provide a share-link alternative. Names are trimmed, length limited and rendered as React text. Saving is local to browser and origin; it is intentionally not represented as a cloud account or backend feature.

## Camera and performance

OrbitControls imposes distance/polar limits and disables pan. Presets smoothly interpolate toward a known camera vector, or jump immediately with reduced motion. User interaction cancels a preset and temporarily pauses automatic rotation. Demand rendering avoids a permanent animation loop when idle. DPR is capped at 1.5, shadow resolution is bounded and procedural textures are tiny. Realistic tradeoffs include a sizable Three.js bundle and preserveDrawingBuffer for direct PNG capture.

## Reliability and export

The WebGL canvas is the image source, not an HTML screenshot or placeholder. PNG generation is asynchronous via toBlob, downloads through a temporary object URL, then revokes it. A React error boundary, Canvas fallback and context-loss handler replace 3D with a static chair illustration while retaining configuration controls. The interface uses real buttons, fieldsets, accessible labels, selected states and live announcements.

## What I would discuss next

Before production: perform device/GPU testing, verify PNG pixels in supported browsers, profile demand rendering and bundle load, consider lazy-loading the 3D viewer, and introduce explicit schema migrations when options change. Cloud persistence would require a new privacy/authentication design. Real commerce would need authoritative server pricing and inventory; this demo intentionally has neither.
