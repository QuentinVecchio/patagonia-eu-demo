/**
 * values-strip — 4-column grid of brand values with icon, heading, description.
 *
 * Authoring rows (one row per value):
 *   cell 0: icon — can be <picture>, inline SVG, or a text URL to an SVG/image
 *   cell 1: heading (h4 or p)
 *   cell 2: description
 */
function convertTextToImage(cell) {
  if (!cell) return;
  if (cell.querySelector('picture, img, svg')) return;
  const text = cell.textContent.trim();
  if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i)
    || text.match(/^https?:\/\/.*\/(dw|image|media)\//i)) {
    const img = document.createElement('img');
    img.src = text;
    img.alt = '';
    img.loading = 'lazy';
    cell.textContent = '';
    cell.appendChild(img);
  }
}

export default async function decorate(block) {
  if (block.closest('.generated-section')) return;

  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    // Convert text URLs to images in the icon cell
    convertTextToImage(cells[0]);
  });

  // Style via CSS only — no DOM rebuild needed for this simple grid
}
