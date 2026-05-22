/**
 * values-strip — 4-column grid of brand values with icon, heading, description.
 *
 * Authoring rows (one row per value):
 *   cell 0: <picture> or inline SVG icon
 *   cell 1: heading (h4 or p)
 *   cell 2: description
 */
export default async function decorate(block) {
  if (block.closest('.generated-section')) return;

  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'values-strip-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div');
    item.className = 'value-item';

    // icon
    const iconCell = cells[0];
    if (iconCell) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'value-icon';
      [...iconCell.childNodes].forEach((n) => iconWrap.appendChild(n.cloneNode(true)));
      item.appendChild(iconWrap);
    }

    // heading
    if (cells[1]) {
      const h4 = document.createElement('h4');
      h4.innerHTML = cells[1].innerHTML;
      item.appendChild(h4);
    }

    // description
    if (cells[2]) {
      const p = document.createElement('p');
      p.innerHTML = cells[2].innerHTML;
      item.appendChild(p);
    }

    inner.appendChild(item);
  });

  block.replaceChildren(inner);
}
