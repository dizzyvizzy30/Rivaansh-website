---
name: rivaansh-copy-style
description: Enforce the Rivaansh ENT website writing style when creating or editing site copy, UI labels, metadata, medical content, or owner-facing website text in this project.
---

# Rivaansh Copy Style

Never use an em dash in website text, metadata, content, code-generated copy, or HTML entities.

Rewrite the sentence using a period, comma, colon, or parentheses. Use a normal hyphen only for established compound words or where the existing format specifically requires one.

Never use the standalone word "clinic" in public-facing or owner-facing copy. Refer to Rivaansh as the "centre". Use "hospital" only when referring to an actual hospital or when the owner confirms that Rivaansh is registered as a hospital. For action labels, prefer natural wording such as "Call us" instead of "Call centre".

Technical identifiers may retain the word when changing them would break behavior. Examples include Schema.org's `MedicalClinic` type, existing source filenames, imported variable names, route anchors, asset paths and owner-content folder names.

Before completing any website copy or code change, run `npm run check:copy`. If it fails, rewrite every reported occurrence rather than suppressing the check.
