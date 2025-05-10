# FUTURE_FEATURES.md

## Project: thistragicending

This document outlines proposed future features intended to enhance the user experience, broaden creative utility, and expand the emotional expressiveness of the "thistragicending" platform. These proposals are grouped by function, with technical considerations to help scope implementation.

---

## 1. Printable Jewel Case Instruction System

**Feature Name:** Screen to Sleeve: Jewel Case Assembly Guide

**Description:**  
An animated, step-by-step instruction module that demonstrates how to fold and assemble printed jewel case templates for a complete CD package.

**Components:**
- SVG-based animated folding demo (hands + paper + case)
- Optional audio instructions or background lo-fi track
- Visual tips (e.g., using a ruler for straight folds)
- Stylized hands (variant skin tones, rings, nail polish for thematic expression)

**Purpose:**  
Ensure users can easily produce professional-looking physical CD kits using only a printer and scissors.

**Dev Notes:**
- Consider Lottie animations or lightweight JS-based SVG frame players
- Accessibility: Alt-text and optional text-only version

---

## 2. Booklet Generator (Liner Notes Composer)

**Feature Name:** Liner Lore

**Description:**  
A tool that allows users to create, edit, and print multipage CD booklets. Booklets can include user-written blurbs, AI-assisted notes, and stylized lyric pages.

**Components:**
- Rich text editor with handwriting/stamp fonts
- Drag-and-drop page layout
- AI prompt integration to auto-fill “thoughts” or “track-by-track insights”
- Export to booklet-sized PDF (compatible with jewel case dimensions)

**Purpose:**  
Enhance creative expression by letting users add personal stories or emotional context alongside music selections.

**Dev Notes:**
- Consider using a WYSIWYG editor with custom styles (e.g., TipTap, Slate.js)
- PDF generation via jsPDF or Puppeteer
- Maintain safe margins for folding and trimming

---

## 3. Themed Visual Identity System

**Feature Name:** Tragic Palette System

**Description:**  
Each music “vibe” selection applies a preset style across UI, booklet templates, and artwork filters.

**Components:**
- Color scheme preset
- Font pairings
- Optional image overlays/textures
- Alternate Assistant avatar (for future expansion)

**Purpose:**  
Offer consistent mood-based styling across outputs while improving user immersion.

**Dev Notes:**
- Define theme JSON schemas
- Dynamic style application via CSS variables
- Ensure theme compatibility with PDF export system

---

## 4. Record Label Builder

**Feature Name:** Bedroom Empire

**Description:**  
Allow users to create a custom record label name, logo, and branding that gets printed on the jewel case template and embedded in metadata.

**Components:**
- Input for label name, slogan/tagline
- Logo upload (or style-based generator)
- Auto-generated catalog number system (e.g., SAD-001, TRAGIC-002)
- Optional “press release” AI output for the full CD bundle

**Purpose:**  
Adds identity, brand, and personalization to every disc. Builds repeat engagement through collection-building.

**Dev Notes:**
- Logo generator could be done with simple canvas + style filters
- Store label profiles with session or user accounts
- Trackable metadata for future sharing/collaboration features

---

## 5. Liner Note Prompt Generator

**Feature Name:** AI-Enhanced CD Notes

**Description:**  
Provide users with suggestions or starter copy for their liner notes, based on selected tracks, themes, or free-form user input.

**Components:**
- Prompt form (e.g., “This mix is about…”)
- AI-generated text (1-2 paragraphs)
- Auto-insert into booklet layout

**Purpose:**  
Help users who may struggle to express complex emotions turn their playlists into coherent, impactful statements.

**Dev Notes:**
- Requires API integration with an LLM (e.g., OpenAI or local model)
- Token limit monitoring depending on pricing constraints

---

## 6. Downloadable Bundle Export

**Feature Name:** Burn to ZIP

**Description:**  
One-click export that bundles the user’s selected tracks, cover art, booklet PDF, and metadata into a .ZIP file.

**Components:**
- All selected files packaged with:
  - `cover.jpg`
  - `booklet.pdf`
  - `tracklist.txt`
  - `meta.json`

**Purpose:**  
Provides a tangible archive and enables offline sharing/burning.

**Dev Notes:**
- Use server-side compression (e.g., `zipstream`, `archiver`) or client-side JS fallback
- Prepare download queue if files are large or sourced via API

---

## 7. CD Spine and Case Template Expander

**Feature Name:** Full Jewel Case Layout

**Description:**  
Expand the printable export system to include:
- Front cover
- Back cover
- Spine labels
- Optionally, top-of-disc printable artwork

**Purpose:**  
Delivers a complete DIY print-and-assemble CD kit.

**Dev Notes:**
- Ensure size compatibility with standard jewel case inserts (e.g., 4.75" x 4.72" front/back)
- Spine formatting may need mirrored text for front/back label printing

---

## 8. Emotion Tag System for Tracks

**Feature Name:** Emotion Tags

**Description:**  
Allow users to assign tags to songs (e.g., “melancholy,” “rage,” “healing”), either manually or by suggestion, and generate playlists based on tag profiles.

**Components:**
- Track tagging UI
- Emotion filter/search
- AI assistance to suggest tags based on title/lyrics

**Purpose:**  
Adds deep emotional searchability and mood tracking for users.

**Dev Notes:**
- Store emotion tag data as arrays per track
- Optional tag cloud / sentiment chart visualization

---

## 9. Ghost Assistant System (Optional)

**Feature Name:** Companion Overlay (Ghost Assistant)

**Description:**  
Add a visual avatar that reacts to user actions, offers tips, and guides through the process in a lighthearted way.

**Components:**
- Animated or sprite-based character (floating overlay)
- Reaction text (e.g., “Nice fold!” / “Try matching this track’s mood.”)
- Variant avatars per theme

**Purpose:**  
Creates a friendlier and more narrative UX. Builds user engagement and emotional connection.

**Dev Notes:**
- Avatar UI togglable
- Basic state machine for responses
- Sprite or Lottie-based animations

---

## 10. AI-Lyrics or “Liner Poetry” Generator

**Feature Name:** Liner Poetry

**Description:**  
Auto-generate lyrical fragments, quote blocks, or poems based on playlist moods and themes for inclusion in booklets or cover text.

**Components:**
- User selects tone (e.g., sorrow, defiance, nostalgia)
- AI generates 2–3 short free-verse entries
- Stylized output ready to paste into layout

**Purpose:**  
Empowers emotional expression even without musical or writing skill.

**Dev Notes:**
- Token management required
- Generate clean, short-form poetic text using prompt tuning

---

## Metadata & Compatibility

**Print Sizes Supported:**  
- Standard Jewel Case (120mm x 120mm)  
- Spine Inserts (1/8 inch x 5 inches typical)  
- CD booklet (front/back optional folds)

**Dependencies Considered:**
- PDF generation
- AI prompt integrations
- Theming engine with modular override
- Zip archive handling
- LocalStorage or user account system (future optional)

---

## Final Note

These features aim to increase the expressive power of thistragicending, giving users the ability to not just burn music, but **tell a story**, **leave a mark**, and **preserve a memory** through tactile, emotional design.