/**
 * ww-grid — Worn Wear 3-column marketing tile grid (large + tall + squares).
 *
 * Authoring rows (one row per tile):
 *   cell 0: tile type variant: "large" | "tall" | "square" | "text" | "wide"
 *   cell 1: <picture> image OR plain text URL (empty for text tiles)
 *   cell 2: eyebrow label (optional)
 *   cell 3: heading
 *   cell 4: CTA link — wrap in <strong> for rust or <em> for cream button
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

  const grid = document.createElement('div');
  grid.className = 'ww-grid-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const variant = cells[0]?.textContent?.trim().toLowerCase() || 'square';
    const pic = cells[1]?.querySelector('picture, img');
    const labelText = cells[2]?.textContent?.trim() || '';
    const headingText = cells[3]?.innerHTML || '';
    const ctaNodes = cells[4] ? [...cells[4].childNodes] : [];

    if (variant === 'text') {
      // Text-only tile
      const tile = document.createElement('div');
      tile.className = 'ww-tile-text';
      if (headingText) {
        const h3 = document.createElement('h3');
        h3.innerHTML = headingText;
        tile.appendChild(h3);
      }
      if (ctaNodes.length) {
        const actions = document.createElement('div');
        actions.className = 'ww-tile-actions';
        ctaNodes.forEach((n) => actions.appendChild(n.cloneNode(true)));
        tile.appendChild(actions);
      }
      grid.appendChild(tile);
    } else {
      const tile = document.createElement('div');
      tile.className = `ww-tile ww-tile-${variant}`;

      if (pic) tile.appendChild(pic);

      const overlay = document.createElement('div');
      overlay.className = 'ww-tile-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      tile.appendChild(overlay);

      const content = document.createElement('div');
      content.className = 'ww-tile-content';

      if (labelText) {
        const p = document.createElement('p');
        p.className = 'ww-tile-label';
        p.textContent = labelText;
        content.appendChild(p);
      }
      if (headingText) {
        const h3 = document.createElement('h3');
        h3.innerHTML = headingText;
        content.appendChild(h3);
      }
      if (ctaNodes.length) {
        const actions = document.createElement('div');
        actions.className = 'ww-tile-actions';
        ctaNodes.forEach((n) => actions.appendChild(n.cloneNode(true)));
        content.appendChild(actions);
      }

      tile.appendChild(content);
      grid.appendChild(tile);
    }
  });

  block.replaceChildren(grid);
}
