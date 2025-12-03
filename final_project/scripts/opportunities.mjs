import { fetchOpportunities } from './data.mjs';

document.addEventListener('DOMContentLoaded', initOpportunities);

async function initOpportunities(){
  const ops = await fetchOpportunities();
  // Guarantee 15 items: if less, duplicate intelligently (for demo)
  const items = ops.length >= 15 ? ops : fillTo15(ops);

  const categorySelect = document.getElementById('filterCategory');
  populateCategories(items, categorySelect);

  const grid = document.getElementById('opportunityGrid');
  const sortSelect = document.getElementById('sortSelect');
  const clearSavedBtn = document.getElementById('clearSaved');

  function render(list){
    // generate HTML via template literals and array.map
    grid.innerHTML = list.map(op => createCard(op)).join('');
    attachHandlers();
  }

  function createCard(op){
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

  // initial render
  render(items);

  // attach event listeners for dynamic buttons
  function attachHandlers(){
    document.querySelectorAll('.details').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const op = items.find(x => x.id === id);
        if (op) window.appModal.openModal(op.title, `${op.description} — Investment: $${op.investmentUSD.toLocaleString()}, Location: ${op.location}`);
      });
    });
    document.querySelectorAll('.save').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        saveOpp(id);
        e.currentTarget.textContent = 'Saved ✓';
        e.currentTarget.disabled = true;
      });
    });
  }

  // filter by category
  categorySelect.addEventListener('change', (e) => {
    const val = e.target.value;
    const filtered = val === 'all' ? items : items.filter(i => i.category === val);
    render(sortList(filtered));
  });

  sortSelect.addEventListener('change', () => {
    render(sortList(items));
  });

  clearSavedBtn.addEventListener('click', () => {
    localStorage.removeItem('savedOpps');
    render(sortList(items));
  });

  function sortList(list){
    const mode = sortSelect.value;
    if (mode === 'investment-asc') return [...list].sort((a,b)=>a.investmentUSD - b.investmentUSD);
    if (mode === 'investment-desc') return [...list].sort((a,b)=>b.investmentUSD - a.investmentUSD);
    // default: saved first (use localStorage)
    const saved = getSaved();
    return [...list].sort((a,b)=>{
      const sa = saved.includes(a.id) ? 0 : 1;
      const sb = saved.includes(b.id) ? 0 : 1;
      return sa - sb;
    });
  }

  // localStorage helpers
  function getSaved(){ return JSON.parse(localStorage.getItem('savedOpps') || '[]'); }
  function saveOpp(id){
    const arr = getSaved();
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem('savedOpps', JSON.stringify(arr));
    }
  }

  // helper functions
  function populateCategories(list, select){
    const cats = Array.from(new Set(list.map(i=>i.category))).sort();
    select.innerHTML = `<option value="all">All</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
  }

  function fillTo15(list){
    // if too few items, duplicate with new ids (for demo purposes) — ensures 15 dynamic items
    const out = [...list];
    let i = 1;
    while (out.length < 15) {
      const src = list[(i-1) % list.length];
      const copy = {...src, id: `${src.id}-copy${i}`, title: `${src.title} (${i})`};
      out.push(copy);
      i++;
    }
    return out;
  }
}
