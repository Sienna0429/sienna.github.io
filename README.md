# sienna.github.io
## IAT 355 — Sienna Wu — Personal Website  


## Purpose
This is my personal website. The **Home** page introduces who I am (bio, major, skills, education, experience, contact), and the **Visualization Project** page showcases two visualizations. The site is responsive so it’s easy to browse on different screen sizes.


## Pages & Features

### Home (`index.html`)
- **Personal introduction**: name, major, brief interests  
- **Contact**: email, LinkedIn, GitHub  
- Clicking the **name logo (top-left)** navigates back to the Home page

### Visualization Project (`visualizations.html`)

#### 1) Data Visualization — “Top 20 Cities with the Most Starbucks”
- Bar chart where the **y-axis** is the number of Starbucks stores and the **x-axis** lists city names with state abbreviations  
- Includes chart title and labeled axes  
- Built with **vanilla JS + SVG**

#### 2) Cat Expression Toggle — “Bibi”
- Drew my cat Bibi as a line illustration, vectorized in **Figma** (exported as **SVG**) and reused the SVG path code  
- Two expressions: **closed mouth** and **open mouth**  
- Users can toggle expressions by clicking the image or the button beneath it


## Technologies Used
- **HTML5**, **CSS3** (responsive layout with media queries)  
- **JavaScript** (`main.js`) for interactions (form/controls, toggles, event handling)  
- **SVG** (hand-authored and JS-generated) in `vis.js` for the bar chart and illustrations  
- **Figma** for converting drawings to SVG paths  
- **Font Awesome** for footer icons (email, LinkedIn, GitHub)


## Project Structure
- index.html # Home page
- visualizations.html # Visualization Project page
- style.css # Global styles (includes responsive rules)
- main.js # Site-wide interactions (chart render, cat toggle)
- vis.js # SVG drawing & chart generation code
- images/ # Images / exported SVG assets
- README.md # This file


## Navigation
- **Top-left name logo** → always returns to Home  
- Home contains a link to **Visualization Project**  
- Footer includes quick links (Email / LinkedIn / GitHub / Back to top)



## Data Source
- Starbucks counts:  
  https://cafely.com/blogs/research/starbucks-statistics?srsltid=AfmBOooTrTNOxZ3IKNzvPeaSDOHOcJ7z-D8Qc1mjzHkhyzcvHUME1fqT
