/**
 * recommendations — 4-column grid of product cards with image, name, color, price.
 *
 * Authoring rows:
 *   row 0: section heading (optional, single cell)
 *   rows 1+: product card — 4 cells: <picture>, name, color, price
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  let heading = '';
  let cardRows = rows;

  if (rows[0].children.length === 1 && !rows[0].querySelector('picture, img')) {
    heading = rows[0].textContent.trim();
    cardRows = rows.slice(1);
  }

  const inner = document.createElement('div');
  inner.className = 'rec-inner';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    inner.appendChild(h2);
  }

  const grid = document.createElement('div');
  grid.className = 'rec-grid';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const pic = cells[0]?.querySelector('picture, img');
    const name = cells[1]?.textContent?.trim() || '';
    const color = cells[2]?.textContent?.trim() || '';
    const priceText = cells[3]?.textContent?.trim() || '';
    const link = cells[0]?.querySelector('a') || cells[1]?.querySelector('a');
    const href = link?.href || '#';

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
