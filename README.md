# Santhosh Kumar S — Mechanical Engineer Portfolio

A clean, multilingual portfolio website for a Mechanical Engineer with 6+ years of experience in product development, CAD modeling, CFD, structural analysis, and end-to-end manufacturing.

## Live Demo

> After deploying to GitHub Pages, your site will be available at:  
> `https://<your-username>.github.io/<repo-name>/`

## Features

- **German-inspired industrial design** — clean grid layout, professional typography, high readability
- **Multi-language system** — German (default), English, Japanese, French, Spanish, Italian, Dutch, Portuguese, Polish, Swedish
- **Instant language switch** — no page reload, updates all sections
- **Light/Dark theme toggle** — stored in localStorage
- **Structured sections** — Home, About, Portfolio, Success Stories, Contact
- **Responsive design** — optimized for desktop and mobile
- **Downloadable resume**

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts — Inter, IBM Plex Sans

## Project Structure

```
├── index.html                  # Main portfolio page
├── css/                        # Stylesheets
│   └── styles.css
├── js/                         # Application scripts
│   └── app.js
├── locales/                    # Translation files
│   ├── de.json
│   ├── en.json
│   ├── es.json
│   ├── fr.json
│   ├── it.json
│   ├── ja.json
│   ├── nl.json
│   ├── pl.json
│   ├── pt.json
│   └── sv.json
├── CFD/                        # CFD analysis images & videos
├── Concept Development/        # Concept development media & CAD files
├── Design/                     # Product design images
├── End to end/                 # End-to-end project files
├── nesting/                    # Nesting optimization images
├── profile/                    # Profile photo
├── resume/                     # Downloadable resume PDF
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
