/**
 * promo-strip — Centered text promotional strip with cream background.
 *
 * Authoring rows:
 *   row 0: heading
 *   row 1: body paragraph
 *   row 2: CTA — wrap in <strong> for dark pill button
 */
export default async function decorate(block) {
  // CSS-only for generated sections; light JS for authored pages
  if (block.closest('.generated-section')) return;

  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'promo-strip-inner';

  rows.forEach((row) => {
    [...row.children].forEach((cell) => {
      inner.appendChild(cell);
    });
  });

  block.replaceChildren(inner);
}
