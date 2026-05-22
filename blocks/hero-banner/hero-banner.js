/**
 * hero-banner — Full-width 75vh banner with image and text overlay.
 *
 * Authoring rows:
 *   row 0: <picture> background image OR plain text URL
 *   row 1: heading
 *   row 2: CTA — wrap in <strong> for pill button
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
