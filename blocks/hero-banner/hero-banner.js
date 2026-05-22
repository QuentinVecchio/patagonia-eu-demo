/**
 * hero-banner — Full-width 75vh banner with image and text overlay.
 *
 * Authoring rows:
 *   row 0: <picture> background image
 *   row 1: heading
 *   row 2: CTA — wrap in <strong> for pill button
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const pic = rows[0]?.querySelector('picture, img');
  const heading = rows[1]?.innerHTML || '';
  const ctaNodes = rows[2] ? [...rows[2].firstElementChild?.childNodes || []] : [];

  const inner = document.createElement('div');
  inner.className = 'hero-banner-inner';

  if (pic) inner.appendChild(pic);

  const overlay = document.createElement('div');
  overlay.className = 'hero-banner-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  inner.appendChild(overlay);

  const content = document.createElement('div');
  content.className = 'hero-banner-content';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.innerHTML = heading;
    content.appendChild(h2);
  }

  if (ctaNodes.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-banner-actions';
    ctaNodes.forEach((n) => actions.appendChild(n.cloneNode(true)));
    content.appendChild(actions);
  }

  inner.appendChild(content);
  block.replaceChildren(inner);
}
