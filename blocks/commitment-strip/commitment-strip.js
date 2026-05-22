/**
 * commitment-strip — Dark centred text strip with CTA.
 *
 * Authoring rows:
 *   row 0: heading
 *   row 1: body paragraph
 *   row 2: CTA — wrap in <em> for outline-cream button
 */
export default async function decorate(block) {
  if (block.closest('.generated-section')) return;

  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'commitment-strip-inner';

  rows.forEach((row) => {
    [...row.children].forEach((cell) => inner.appendChild(cell));
  });

  block.replaceChildren(inner);
}
