// example product list (could be fetched)
const products = [
  {id:'p1',name:'Solar Panel Kit'},
  {id:'p2',name:'Water Purifier'},
  {id:'p3',name:'Irrigation Pump'},
  {id:'p4',name:'Home Inverter'},
  {id:'p5',name:'Smart Lighting System'}
];

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('productName');
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  // Persist last selected product as a simple example of localStorage usage
  select.addEventListener('change', () => {
    localStorage.setItem('lastProduct', select.value);
  });

  const last = localStorage.getItem('lastProduct');
  if (last) select.value = last;
});
