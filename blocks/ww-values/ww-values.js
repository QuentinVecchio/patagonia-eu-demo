/**
 * ww-values — 5-column value props strip on light grey background.
 *
 * Authoring rows (one row per value):
 *   cell 0: icon <picture> or SVG
 *   cell 1: heading
 *   cell 2: description + optional link
 */
export default async function decorate(block) {
  if (block.closest('.generated-section')) return;

  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'ww-values-inner';
  inner.setAttribute('role', 'list');

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div');
    item.className = 'ww-value';
    item.setAttribute('role', 'listitem');

    if (cells[0]) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'ww-value-icon';
      [...cells[0].childNodes].forEach((n) => iconWrap.appendChild(n.cloneNode(true)));
      item.appendChild(iconWrap);
    }
    if (cells[1]) {
      const h4 = document.createElement('h4');
      h4.innerHTML = cells[1].innerHTML;
      item.appendChild(h4);
    }
    if (cells[2]) {
      const p = document.createElement('p');
      p.innerHTML = cells[2].innerHTML;
      item.appendChild(p);
    }

    inner.appendChild(item);
  });

  block.replaceChildren(inner);
}
