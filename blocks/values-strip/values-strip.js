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
  const inner = document.createElement('div');
  inner.className = 'values-strip-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div');
    item.className = 'value-item';

    // icon cell - convert text URL to image if needed
    const iconCell = cells[0];
    if (iconCell) {
      convertTextToImage(iconCell);
      const iconWrap = document.createElement('div');
      iconWrap.className = 'value-icon';
      [...iconCell.childNodes].forEach((n) => iconWrap.appendChild(n.cloneNode(true)));
      item.appendChild(iconWrap);
    }

    // heading
    if (cells[1]) {
      const h4 = document.createElement('h4');
      h4.textContent = cells[1].textContent.trim();
      item.appendChild(h4);
    }

    // description
    if (cells[2]) {
      const p = document.createElement('p');
      p.textContent = cells[2].textContent.trim();
      item.appendChild(p);
    }

    inner.appendChild(item);
  });

  block.replaceChildren(inner);
}
