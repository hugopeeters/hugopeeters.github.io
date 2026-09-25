# hugopeeters.github.io

This is a simple showcase of my projects.

## Adding a project

The site is built by GitHub Pages with Jekyll. Every project page uses the shared
layout in `_layouts/`, and the sidebar menu is generated from `_data/projects.yml`.

1. Create a folder with the sketch files and an `index.html` like this:

   ```html
   ---
   layout: project
   title: "My Project"
   description: "One line shown on the home page card."
   scripts:
     - sketch.js
     - particle.js
   ---
   <p>
     A short description of the project.
   </p>
   <div id="canvas"></div>
   ```

   Optional front matter: `p5: false` skips loading p5.js, and `head: |` adds
   extra tags (libraries, styles) to the page `<head>`.

2. Add a `thumb.jpg` (480×360) screenshot to the folder for the home page card.

3. Add the project to `_data/projects.yml` so it shows up in the menu and on the
   home page.

To preview locally, run `jekyll serve` and open http://localhost:4000.
