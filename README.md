# Santhosh Kumar S — Mechanical Engineer Portfolio

A modern, interactive portfolio website for a Mechanical Engineer with 6+ years of experience in Product Development, CAD Modeling, CFD, Structural Analysis, and End-to-End Manufacturing.

## Live Demo

> After deploying to GitHub Pages, your site will be available at:  
> `https://<your-username>.github.io/<repo-name>/`

## Features

- **Interactive 3D Robot Animation** — Six-axis articulated robot with realistic servo motion, pneumatic gripper, and pick-and-place cycle (Three.js)
- **3D CAD Viewer** — Upload and view STEP, STL, and OBJ files directly in the browser with measurement tools and render modes
- **Project Showcase** — Categorized tabs: Product Design, CFD Analysis, Structural Analysis, Nesting, Concept Development, End-to-End Projects
- **Dark/Light Theme Toggle**
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Downloadable Resume**

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- [Three.js r128](https://threejs.org/) — 3D rendering
- [occt-import-js v0.0.23](https://github.com/nicholasgasior/occt-import-js) — STEP file parsing
- [Font Awesome 6.5](https://fontawesome.com/) — Icons
- [Google Fonts](https://fonts.google.com/) — Rajdhani, Share Tech Mono, Exo 2

## Project Structure

```
├── index.html                  # Main portfolio page (all-in-one)
├── CFD/                        # CFD analysis images & videos
├── Concept Development/        # Concept development media & CAD files
├── Design/                     # Product design images
├── End to end/                 # End-to-end project files
├── nesting/                    # Nesting optimization images
├── profile/                    # Profile photo
├── resume/                     # Downloadable resume PDF
├── robo/                       # Robot/CAD images
├── Structural analysis/        # FEA/structural analysis media
├── README.md
└── .gitignore
```

## Deployment (GitHub Pages)

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save** — your site will be live in a few minutes

## Local Development

Simply open `index.html` in a browser — no build step required.

Or use any static server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## Author

**Santhosh Kumar S**  
Project Engineer | Mechanical Design | CAD | CFD | FEA

## License

This project is for personal portfolio use.
