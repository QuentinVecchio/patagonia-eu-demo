/**
 * split-banners — Two equal-width 60vh image banners side by side.
 *
 * Authoring rows (one row per banner):
 *   cell 0: <picture> image
 *   cell 1: heading / title
 *   cell 2: CTA link — wrap in <strong>
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const container = document.createElement('div');
  container.className = 'split-banners-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const pic = cells[0]?.querySelector('picture, img');
    const heading = cells[1]?.innerHTML || '';
    const ctaNodes = cells[2] ? [...cells[2].childNodes] : [];

    const banner = document.createElement('div');
    banner.className = 'split-banner';

    if (pic) banner.appendChild(pic);

    const overlay = document.createElement('div');
    overlay.className = 'split-banner-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    banner.appendChild(overlay);

    const content = document.createElement('div');
    content.className = 'split-banner-content';
    if (heading) {
      const h3 = document.createElement('h3');
      h3.innerHTML = heading;
      content.appendChild(h3);
    }
    if (ctaNodes.length) {
      const actions = document.createElement('div');
      actions.className = 'split-banner-actions';
      ctaNodes.forEach((n) => actions.appendChild(n.cloneNode(true)));
      content.appendChild(actions);
    }
    banner.appendChild(content);
    container.appendChild(banner);
  });

  block.replaceChildren(container);
}
