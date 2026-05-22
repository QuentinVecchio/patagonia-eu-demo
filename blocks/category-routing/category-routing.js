/**
 * category-routing — 5-column grid of category tiles with hover zoom.
 *
 * Authoring rows (one row per tile):
 *   cell 0: label (heading or p)
 *   cell 1: <picture> image OR plain text URL
 *   cell 2: link URL (plain link)
 */

/**
 * Convert plain-text image URLs in cells to <img> elements.
 * Supports both DA-editor authored content (picture elements) and
 * programmatic uploads (text URLs).
 */
function convertTextToImages(block) {
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    if (cell.querySelector('picture, img')) return;
    const text = cell.textContent.trim();
    if (
      text.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i)
      || text.match(/^https?:\/\/.*\/(dw|image|media)\//i)
    ) {
      const img = document.createElement('img');
      img.src = text;
      img.alt = '';
      img.loading = 'lazy';
      cell.textContent = '';
      cell.appendChild(img);
    }
  });
}

export default async function decorate(block) {
  convertTextToImages(block);

  const rows = [...block.children];
  if (!rows.length) return;

  // Extract label heading from first row if it's a single-cell header
  let labelEl = null;
  let tileRows = rows;
  if (rows[0].children.length === 1 && !rows[0].querySelector('picture, img')) {
    labelEl = rows[0].querySelector('h2, h3, p');
    tileRows = rows.slice(1);
  }

  const section = document.createElement('div');
  section.className = 'routing-inner';

  if (labelEl) {
    const lbl = document.createElement('h2');
    lbl.textContent = labelEl.textContent.trim();
    section.appendChild(lbl);
  }

  const grid = document.createElement('div');
  grid.className = 'routing-grid';

  tileRows.forEach((row) => {
    const cells = [...row.children];
    const titleEl = cells[0];
    const picEl = cells[1]?.querySelector('picture, img');
    const linkEl = cells[2]?.querySelector('a') || cells[0]?.querySelector('a');

    const href = linkEl?.href || '#';
    const title = (linkEl?.textContent || titleEl?.textContent || '').trim().replace(/^.*\//, '');

    const tile = document.createElement('a');
    tile.href = href;
    tile.className = 'routing-tile';
    tile.setAttribute('aria-label', title || 'Category');

    if (picEl) tile.appendChild(picEl);

    const span = document.createElement('span');
    span.className = 'routing-tile-label';
    span.textContent = title;
    tile.appendChild(span);

    grid.appendChild(tile);
  });

  section.appendChild(grid);
  block.replaceChildren(section);
}
