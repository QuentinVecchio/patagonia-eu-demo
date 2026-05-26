/**
 * recommendations — 4-column grid of product cards with image, name, color, price.
 *
 * Authoring rows:
 *   row 0: section heading (optional, single cell)
 *   rows 1+: product card — 4 cells: <picture> OR text URL, name, color, price
 *
 * Note: image cell may contain <a href="..."><picture>...</picture></a>
 * or <a href="..."><p>URL</p></a> — link is extracted before image conversion.
 */

/**
 * Convert plain-text image URLs in cells to <img> elements.
 * Supports both DA-editor authored content (picture elements) and
 * programmatic uploads (text URLs).
 * NOTE: clears cell content, so extract links BEFORE calling this.
 */
function convertTextToImages(block) {
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    if (cell.querySelector('picture, img')) return;
    // Get text from deepest text node (handles <a><p>URL</p></a> wrapper)
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
  if (block.closest('.generated-section')) return;
  const rows = [...block.children];
  if (!rows.length) return;

  let heading = '';
  let cardRows = rows;

  if (rows[0].children.length === 1 && !rows[0].querySelector('picture, img')) {
    heading = rows[0].textContent.trim();
    cardRows = rows.slice(1);
  }

  // Extract links from image cells BEFORE convertTextToImages clears them
  const cardLinks = cardRows.map((row) => {
    const cells = [...row.children];
    const link = cells[0]?.querySelector('a') || cells[1]?.querySelector('a');
    return link?.href || '#';
  });

  convertTextToImages(block);

  const inner = document.createElement('div');
  inner.className = 'rec-inner';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    inner.appendChild(h2);
  }

  const grid = document.createElement('div');
  grid.className = 'rec-grid';

  cardRows.forEach((row, idx) => {
    const cells = [...row.children];
    const pic = cells[0]?.querySelector('picture, img');
    const name = cells[1]?.textContent?.trim() || '';
    const color = cells[2]?.textContent?.trim() || '';
    const priceText = cells[3]?.textContent?.trim() || '';
    const href = cardLinks[idx];

    const card = document.createElement('a');
    card.href = href;
    card.className = 'rec-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'rec-card-img';
    if (pic) imgWrap.appendChild(pic);
    card.appendChild(imgWrap);

    if (name) {
      const p = document.createElement('p');
      p.className = 'rec-card-name';
      p.textContent = name;
      card.appendChild(p);
    }
    if (color) {
      const p = document.createElement('p');
      p.className = 'rec-card-color';
      p.textContent = color;
      card.appendChild(p);
    }
    if (priceText) {
      const p = document.createElement('p');
      p.className = 'rec-card-price';
      p.textContent = priceText;
      card.appendChild(p);
    }

    grid.appendChild(card);
  });

  inner.appendChild(grid);
  block.replaceChildren(inner);
}
