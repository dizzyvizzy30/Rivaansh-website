# Photo slots

Save each chosen owner photo here as `<slot-id>.jpg` (or `.jpeg` / `.png` / `.webp`), e.g. `reception-waiting-area.jpg`.
The site picks it up automatically on the next build. Slot ids and briefs: `src/data/photo-slots.ts`.
Shrink large/HEIC phone photos first: `sips -s format jpeg -s formatOptions 85 -Z 2400 <in> --out <slot-id>.jpg`.
