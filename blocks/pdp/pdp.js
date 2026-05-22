/**
 * pdp — Product Detail Page layout with image gallery and product info panel.
 *
 * Authoring rows:
 *   row 0: product category label
 *   row 1: product title (h1)
 *   row 2: price
 *   row 3: rating text
 *   row 4: description paragraph
 *   row 5+: gallery images (one per row, cell 0 = <picture> OR plain text URL)
 *   Last cell 0 of any row may contain sustainability badges as a list
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

  // Extract structured data
  const label = rows[0]?.textContent?.trim() || '';
  const title = rows[1]?.textContent?.trim() || '';
  const price = rows[2]?.textContent?.trim() || '';
  const rating = rows[3]?.innerHTML || '';
  const desc = rows[4]?.innerHTML || '';

  // Gallery images — rows 5+
  const galleryImgs = [];
  for (let i = 5; i < rows.length; i++) {
    const pic = rows[i].querySelector('picture, img');
    if (pic) galleryImgs.push(pic);
  }

  const container = document.createElement('div');
  container.className = 'pdp-container';

  // ── GALLERY ──
  const gallery = document.createElement('div');
  gallery.className = 'gallery';

  const thumbs = document.createElement('div');
  thumbs.className = 'gallery-thumbs';
  thumbs.setAttribute('role', 'listbox');
  thumbs.setAttribute('aria-label', 'Product images');

  const mainWrap = document.createElement('div');
  mainWrap.className = 'gallery-main';
  mainWrap.setAttribute('aria-live', 'polite');

  // Use first gallery image or fallback from rows
  const allPics = galleryImgs.length ? galleryImgs : [rows[0]?.querySelector('picture, img')].filter(Boolean);

  allPics.forEach((pic, i) => {
    const thumb = document.createElement('div');
    thumb.className = `gallery-thumb${i === 0 ? ' active' : ''}`;
    thumb.setAttribute('role', 'option');
    thumb.setAttribute('aria-selected', i === 0 ? 'true' : 'false');

    const imgClone = pic.cloneNode(true);
    thumb.appendChild(imgClone);

    const mainClone = pic.cloneNode(true);

    thumb.addEventListener('click', () => {
      thumbs.querySelectorAll('.gallery-thumb').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      thumb.classList.add('active');
      thumb.setAttribute('aria-selected', 'true');
      mainWrap.replaceChildren(mainClone.cloneNode(true));
    });

    thumbs.appendChild(thumb);

    if (i === 0) mainWrap.appendChild(mainClone);
  });

  gallery.appendChild(thumbs);
  gallery.appendChild(mainWrap);
  container.appendChild(gallery);

  // ── PRODUCT INFO ──
  const info = document.createElement('div');
  info.className = 'product-info';

  if (label) {
    const p = document.createElement('p');
    p.className = 'product-label';
    p.textContent = label;
    info.appendChild(p);
  }
  if (title) {
    const h1 = document.createElement('h1');
    h1.textContent = title;
    info.appendChild(h1);
  }
  if (price) {
    const p = document.createElement('p');
    p.className = 'product-price';
    p.textContent = price;
    info.appendChild(p);
  }
  if (rating) {
    const div = document.createElement('div');
    div.className = 'product-rating';
    div.innerHTML = rating;
    info.appendChild(div);
  }

  // Color selector (static demo)
  const colorGroup = document.createElement('div');
  colorGroup.className = 'product-option-group';
  colorGroup.innerHTML = `
    <p class="product-option-label">Color: <span>Blue Sage</span></p>
    <div class="color-swatches" role="listbox" aria-label="Select color">
      <div class="color-swatch active" role="option" aria-selected="true" aria-label="Blue Sage" style="background-color:rgb(108,127,133)"></div>
      <div class="color-swatch" role="option" aria-selected="false" aria-label="Smolder Blue" style="background-color:rgb(40,50,67)"></div>
      <div class="color-swatch" role="option" aria-selected="false" aria-label="Forge Grey" style="background-color:rgb(54,55,51)"></div>
      <div class="color-swatch" role="option" aria-selected="false" aria-label="Black" style="background-color:rgb(25,23,24)"></div>
    </div>`;
  info.appendChild(colorGroup);

  // Size selector (static demo)
  const sizeGroup = document.createElement('div');
  sizeGroup.className = 'product-option-group';
  sizeGroup.innerHTML = `
    <p class="product-option-label">Size: <span>Select a size</span></p>
    <div class="size-grid" role="listbox" aria-label="Select size">
      <button class="size-btn" role="option" aria-selected="false">XS</button>
      <button class="size-btn" role="option" aria-selected="false">S</button>
      <button class="size-btn active" role="option" aria-selected="true">M</button>
      <button class="size-btn" role="option" aria-selected="false">L</button>
      <button class="size-btn" role="option" aria-selected="false">XL</button>
      <button class="size-btn" role="option" aria-selected="false">XXL</button>
    </div>
    <a href="https://eu.patagonia.com/gb/en/size-charts.html" class="size-guide-link">Find My Size / Size Guide</a>`;
  info.appendChild(sizeGroup);

  // Add to cart
  const atcBtn = document.createElement('button');
  atcBtn.className = 'add-to-cart-btn';
  atcBtn.type = 'button';
  atcBtn.textContent = `Add to Cart \u2014 ${price}`;
  info.appendChild(atcBtn);

  const wishBtn = document.createElement('button');
  wishBtn.className = 'wishlist-btn';
  wishBtn.type = 'button';
  wishBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="display:inline;vertical-align:middle;margin-right:6px" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> Save to Wishlist';
  info.appendChild(wishBtn);

  // Delivery
  const delivery = document.createElement('div');
  delivery.className = 'delivery-info';
  delivery.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span>Free delivery on orders over &pound;90. <a href="https://eu.patagonia.com/gb/en/delivery.html" style="text-decoration:underline">More Details</a></span>`;
  info.appendChild(delivery);

  // Description
  if (desc) {
    const descSection = document.createElement('div');
    descSection.className = 'product-desc-section';
    descSection.innerHTML = desc;
    info.appendChild(descSection);
  }

  // Sustainability badges
  const sustain = document.createElement('div');
  sustain.className = 'sustainability-strip';
  sustain.innerHTML = `
    <div class="sustain-badge"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="7" cy="7" r="6"/><path d="M5 7l2 2 3-3"/></svg> 100% Recycled Shell</div>
    <div class="sustain-badge"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="7" cy="7" r="6"/><path d="M5 7l2 2 3-3"/></svg> PrimaLoft&reg; Eco</div>
    <div class="sustain-badge"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="7" cy="7" r="6"/><path d="M5 7l2 2 3-3"/></svg> Fair Trade Certified&trade;</div>`;
  info.appendChild(sustain);

  // Accordions
  const accData = [
    { title: 'Fit', open: true, content: '<p>Regular fit. Designed for layering. Slightly longer front hem. Hip-length cut for easy movement.</p>' },
    { title: 'Specs &amp; Features', open: false, content: '<ul style="padding-left:16px;margin-top:8px"><li>Shell: 1.3-oz 20-denier 100% recycled polyester ripstop with DWR finish</li><li>Insulation: 60-g PrimaLoft&reg; Gold Insulation Eco with P.U.R.E.&trade; technology</li><li>Weight: 340g (M)</li><li>Packable into its own left-hand chest pocket</li></ul>' },
    { title: 'Materials &amp; Care', open: false, content: '<p>Machine wash cold, gentle cycle. Do not bleach. Tumble dry low.</p><p style="margin-top:8px">Shell made from 100% postconsumer recycled polyester with PFC-free DWR finish.</p>' },
  ];
  const accList = document.createElement('div');
  accList.className = 'accordion-list';
  accData.forEach(({ title: t, open: o, content: c }) => {
    const item = document.createElement('div');
    item.className = `accordion-item${o ? ' open' : ''}`;
    item.innerHTML = `<button class="accordion-trigger" aria-expanded="${o}">${t}<svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button><div class="accordion-content">${c}</div>`;
    item.querySelector('.accordion-trigger').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      accList.querySelectorAll('.accordion-item').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'true');
      }
    });
    accList.appendChild(item);
  });
  info.appendChild(accList);

  container.appendChild(info);
  block.replaceChildren(container);

  // Swatch interactivity
  info.querySelectorAll('.color-swatch').forEach((s) => {
    s.addEventListener('click', () => {
      info.querySelectorAll('.color-swatch').forEach((sw) => {
        sw.classList.remove('active');
        sw.setAttribute('aria-selected', 'false');
      });
      s.classList.add('active');
      s.setAttribute('aria-selected', 'true');
      const labelSpan = s.closest('.product-option-group').querySelector('.product-option-label span');
      if (labelSpan) labelSpan.textContent = s.getAttribute('aria-label');
    });
  });

  // Size interactivity
  info.querySelectorAll('.size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      info.querySelectorAll('.size-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const labelSpan = btn.closest('.product-option-group').querySelector('.product-option-label span');
      if (labelSpan) labelSpan.textContent = btn.textContent.trim();
    });
  });
}
