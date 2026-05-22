/**
 * split-banners — Two equal-width 60vh image banners side by side.
 *
 * Authoring rows (one row per banner):
 *   cell 0: <picture> image OR plain text URL
 *   cell 1: heading / title
 *   cell 2: CTA link — wrap in <strong>
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
