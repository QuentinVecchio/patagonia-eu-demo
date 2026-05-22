/**
 * activism — Full-width centred activism campaign banner with image overlay.
 *
 * Authoring rows:
 *   row 0: <picture> background image
 *   row 1: eyebrow label text
 *   row 2: heading (h2)
 *   row 3: body paragraph
 *   row 4: CTA — wrap in <em> for outline-white secondary button
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const pic = rows[0]?.querySelector('picture, img');
  const label = rows[1]?.textContent?.trim() || '';
  const heading = rows[2]?.innerHTML || '';
  const body = rows[3]?.innerHTML || '';
  const ctaNodes = rows[4] ? [...rows[4].firstElementChild?.childNodes || []] : [];

  const inner = document.createElement('div');
  inner.className = 'activism-inner';

  if (pic) inner.appendChild(pic);

  const overlay = document.createElement('div');
  overlay.className = 'activism-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  inner.appendChild(overlay);

  const content = document.createElement('div');
  content.className = 'activism-content';

  if (label) {
    const p = document.createElement('p');
    p.className = 'activism-label';
    p.textContent = label;
    content.appendChild(p);
  }
  if (heading) {
    const h2 = document.createElement('h2');
    h2.innerHTML = heading;
    content.appendChild(h2);
  }
  if (body) {
    const p = document.createElement('p');
    p.innerHTML = body;
    content.appendChild(p);
  }
  if (ctaNodes.length) {
    const actions = document.createElement('div');
    actions.className = 'activism-actions';
    ctaNodes.forEach((n) => actions.appendChild(n.cloneNode(true)));
    content.appendChild(actions);
  }

  inner.appendChild(content);
  block.replaceChildren(inner);
}
