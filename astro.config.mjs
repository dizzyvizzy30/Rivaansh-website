// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set to the live domain once it is connected (see docs/domain-and-hosting-setup.md).
  // Enables absolute canonical URLs; leave unset until DNS resolves.
  // site: 'https://rivaanshent.com',

  // Emit /pages/about-us.html (not /pages/about-us/index.html) so every existing URL keeps working.
  build: { format: 'file' },
});
