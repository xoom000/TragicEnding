Form Validation & Style Consistency

> Objective:
Ensure every element on the page—especially form validation—matches our custom design system and preserves the emotional tone of the site (goth/emo/punk aesthetic).

Problem:
Native browser validation messages (e.g., “Please fill out this field”) are inconsistent across devices, unstyled, and visually disruptive to our theme. They clash with our visual language and harm the experience.

Solution:

1. Remove all browser-native validation UIs.

Disable the required attribute where used

Use novalidate on all <form> tags to prevent default browser behavior

Manually control validation using JavaScript



2. Build a custom validation system.

All warnings/errors should be injected into the DOM

Follow our design language:

Color palette: bright neons on dark backgrounds (e.g. hot pink, blood red, electric cyan)

Typography: bold, expressive fonts (Orbitron, hand-drawn, distressed)

Layout: hover/fade/glitch effects where appropriate

Tone: emotionally expressive (e.g., “Name your playlist or remain emotionally unheard”)




3. Encapsulate styling in a reusable component or class

Create a validation-warning class with all styling baked in

Should be easy to drop in with a function like showValidationError(input, message)




Goal:
Users should never see a default browser tooltip. Every error message, form interaction, or warning should feel like part of the “tragic digital mixtape ritual.”


