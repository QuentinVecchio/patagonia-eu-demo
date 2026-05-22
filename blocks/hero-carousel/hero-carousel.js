/**
 * hero-carousel — Full-viewport hero with auto-advancing slides.
 *
 * Authoring rows (one row per slide):
 *   cell 0: <picture> slide image
 *   cell 1: slide title (h1 or p)
 *   cell 2: optional body text
 *   cell 3: CTA link — wrap in <strong> for primary pill button
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Build slides from rows
  const slidesData = rows.map((row) => {
    const cells = [...row.children];
    return {
      pic: cells[0]?.querySelector('picture, img') || null,
      title: cells[1]?.innerHTML || '',
      body: cells[2]?.innerHTML || '',
      cta: cells[3] ? [...cells[3].childNodes] : [],
    };
  });

  // Build carousel markup
  const section = document.createElement('div');
  section.className = 'hero-carousel-inner';

  // Slides
  slidesData.forEach((slide, i) => {
    const el = document.createElement('div');
    el.className = `hero-slide${i === 0 ? ' active' : ''}`;
    el.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');

    if (slide.pic) el.appendChild(slide.pic);

    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    el.appendChild(overlay);

    const content = document.createElement('div');
    content.className = 'hero-content';
    if (slide.title) {
      const h1 = document.createElement('h1');
      h1.innerHTML = slide.title;
      content.appendChild(h1);
    }
    if (slide.body) {
      const p = document.createElement('p');
      p.innerHTML = slide.body;
      content.appendChild(p);
    }
    if (slide.cta.length) {
      const actions = document.createElement('div');
      actions.className = 'hero-actions';
      slide.cta.forEach((n) => actions.appendChild(n.cloneNode(true)));
      content.appendChild(actions);
    }
    el.appendChild(content);
    section.appendChild(el);
  });

  // Dots
  if (slidesData.length > 1) {
    const dots = document.createElement('div');
    dots.className = 'hero-dots';
    dots.setAttribute('role', 'tablist');
    slidesData.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = `hero-dot${i === 0 ? ' active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      btn.addEventListener('click', () => goTo(i));
      dots.appendChild(btn);
    });
    section.appendChild(dots);

    // Counter
    const counter = document.createElement('div');
    counter.className = 'hero-slide-counter';
    counter.setAttribute('aria-hidden', 'true');
    counter.textContent = `01 / 0${slidesData.length}`;
    section.appendChild(counter);
  }

  block.replaceChildren(section);

  // Slider logic
  let current = 0;
  const slides = block.querySelectorAll('.hero-slide');
  const dotBtns = block.querySelectorAll('.hero-dot');
  const counter = block.querySelector('.hero-slide-counter');

  function goTo(n) {
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    if (dotBtns[current]) {
      dotBtns[current].classList.remove('active');
      dotBtns[current].setAttribute('aria-selected', 'false');
    }
    current = n;
    slides[current].classList.add('active');
    slides[current].setAttribute('aria-hidden', 'false');
    if (dotBtns[current]) {
      dotBtns[current].classList.add('active');
      dotBtns[current].setAttribute('aria-selected', 'true');
    }
    if (counter) {
      counter.textContent = `${String(current + 1).padStart(2, '0')} / 0${slides.length}`;
    }
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && slides.length > 1) {
    setInterval(() => goTo((current + 1) % slides.length), 5000);
  }
}
