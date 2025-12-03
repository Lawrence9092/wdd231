// form-handler.mjs — populate select, persist last product, basic form UX
const products = [
  { id: 'p1', name: 'Solar Panel Kit' },
  { id: 'p2', name: 'Water Purifier' },
  { id: 'p3', name: 'Irrigation Pump' },
  { id: 'p4', name: 'Home Inverter' },
  { id: 'p5', name: 'Smart Lighting System' }
];

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('productName');
  if (select) {
    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.name;
      opt.textContent = p.name;
      select.appendChild(opt);
    });

    // restore last selection
    const last = localStorage.getItem('lastProduct');
    if (last) select.value = last;

    select.addEventListener('change', () => localStorage.setItem('lastProduct', select.value));
  }

  // show count on review confirmation link if available
  const count = localStorage.getItem('reviewCount');
  // (optional) you can display count somewhere if you add element
});
