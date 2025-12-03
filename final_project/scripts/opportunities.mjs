// opportunities.mjs — fetch data, render 15+ items, filter/sort, localStorage, modal usage
import { fetchOpportunities } from './data.mjs';
import './modal.mjs'; // initModal called by main.mjs but safe to import here

document.addEventListener('DOMContentLoaded', init);

async function init(){
  const raw = await fetchOpportunities();
  const items = raw.length >= 15 ? raw.slice(0) : growTo15(raw);
  const grid = document.getElementById('opportunityGrid');
  const filter = document.getElementById('filterCategory');
  const sortSelect = document.getElementById('sortSelect');
  const clearBtn = document.getElementById('clearSaved');

  populateCategories(items, filter);
  render(items);

  filter.addEventListener('change', () => {
    render(applySort(items.filter(i => filter.value === 'all' ? true : i.category === filter.value)));
  });
  sortSelect.addEventListener('change', () => render(applySort(items)));
  clearBtn.addEventListener('click', () => { localStorage.removeItem('savedOpps'); render(items); });

  function render(list){
    if (!grid) return;
    grid.innerHTML = list.map(cardHTML).join('');
    attachHandlers();
  }

  function cardHTML(op){
    const saved = getSaved().includes(op.id);
    return `
      <article class="opp-card" data-id="${op.id}" aria-labelledby="${op.id}-title">
        <img src="images/${op.id}.jpg" alt="${op.title} image" loading="lazy" onerror="this.src='images/placeholder.jpg'"/>
        <div>
          <h3 id="${op.id}-title">${op.title}</h3>
          <p>${op.description}</p>
          <div class="opp-meta">
            <span><strong>Category:</strong> ${op.category}</span>
            <span><strong>Location:</strong> ${op.location}</span>
            <span><strong>Investment:</strong> $${Number(op.investmentUSD).toLocaleString()}</span>
          </div>
          <div class="opp-actions">
            <button class="btn details" data-id="${op.id}">Details</button>
            <button class="btn-outline save" data-id="${op.id}" ${saved ? 'disabled' : ''}>${saved ? 'Saved ✓' : 'Save'}</button>
          </div>
        </div>
      </article>
    `;
  }

  function attachHandlers(){
    document.querySelectorAll('.details').forEach(b => b.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const op = items.find(x => x.id === id);
      if (op && window.appModal) window.appModal.openModal(op.title, `${op.description} — Investment: $${op.investmentUSD.toLocaleString()} — Location: ${op.location}`);
    }));
    document.querySelectorAll('.save').forEach(b => b.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      saveOpp(id);
      e.currentTarget.textContent = 'Saved ✓';
      e.currentTarget.disabled = true;
    }));
  }

  function getSaved(){ return JSON.parse(localStorage.getItem('savedOpps') || '[]'); }
  function saveOpp(id){
    const arr = getSaved();
    if (!arr.includes(id)){ arr.push(id); localStorage.setItem('savedOpps', JSON.stringify(arr)); }
  }

  function populateCategories(list, sel){
    const cats = Array.from(new Set(list.map(i => i.category))).sort();
    sel.innerHTML = `<option value="all">All</option>${cats.map(c => `<option value="${c}">${c}</option>`).join('')}`;
  }

  function applySort(list){
    const mode = sortSelect.value;
    if (mode === 'investment-asc') return [...list].sort((a,b)=>a.investmentUSD - b.investmentUSD);
    if (mode === 'investment-desc') return [...list].sort((a,b)=>b.investmentUSD - a.investmentUSD);
    // default: saved first
    const saved = getSaved();
    return [...list].sort((a,b) => (saved.includes(b.id) ? 0 : 1) - (saved.includes(a.id) ? 0 : 1)).reverse();
  }

  function growTo15(list){
    const out = [...list];
    let i = 1;
    while (out.length < 15) {
      const src = list[(i-1) % list.length] || { id:'demo'+i, title:'Demo '+i, description:'Sample item', category:'General', location:'Various', investmentUSD:1000+i };
      const copy = {...src, id: `${src.id}-copy${i}`, title: `${src.title} (${i})`};
      out.push(copy);
      i++;
    }
    return out;
  }
}
