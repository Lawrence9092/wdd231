// opportunities.mjs — clean, modern, 6-card layout
import { fetchOpportunities } from './data.mjs';
import './modal.mjs';

document.addEventListener('DOMContentLoaded', init);

async function init() {
  const raw = await fetchOpportunities();

  // Limit to 6 items for the 3×2 grid
  const items = raw.slice(0, 6);

  const grid = document.getElementById('opportunityGrid');
  const filter = document.getElementById('filterCategory');
  const sortSelect = document.getElementById('sortSelect');
  const clearBtn = document.getElementById('clearSaved');

  populateCategories(raw, filter); // categories from all data
  render(items);

  // EVENT LISTENERS
  filter.addEventListener('change', () => {
    const filtered =
      filter.value === 'all'
        ? items
        : items.filter(i => i.category === filter.value);
    render(applySort(filtered));
  });

  sortSelect.addEventListener('change', () => render(applySort(items)));

  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('savedOpps');
    render(items);
  });

  /* ------------------------------------------------------------
     Render Grid
  ------------------------------------------------------------ */
  function render(list) {
    if (!grid) return;
    grid.innerHTML = list.map(cardHTML).join('');
    attachHandlers(list);
  }

  /* ------------------------------------------------------------
     HTML for each card
  ------------------------------------------------------------ */
  function cardHTML(op) {
    const saved = getSaved().includes(op.id);
    return `
      <article class="opp-card" data-id="${op.id}" aria-labelledby="${op.id}-title">
        <img src="${op.image}" 
             alt="${op.title}" 
             loading="lazy" 
             onerror="this.src='images/placeholder.jpg'"/>

        <div>
          <h3 id="${op.id}-title">${op.title}</h3>
          <p>${op.description}</p>

          <div class="opp-meta">
            <span><strong>Category:</strong> ${op.category}</span>
            <span><strong>Location:</strong> ${op.location}</span>
            <span><strong>Investment:</strong> $${Number(op.investment).toLocaleString()}</span>
          </div>

          <div class="opp-actions">
            <button class="btn details" data-id="${op.id}">Details</button>
            <button class="btn-outline save" data-id="${op.id}" ${saved ? 'disabled' : ''}>
              ${saved ? 'Saved ✓' : 'Save'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /* ------------------------------------------------------------
     Button Handlers (Modal + Save)
  ------------------------------------------------------------ */
  function attachHandlers(list) {
    document.querySelectorAll('.details').forEach(btn =>
      btn.addEventListener('click', e => {
        const id = Number(e.currentTarget.dataset.id);
        const op = list.find(x => x.id === id);

        if (op && window.appModal) {
          const body = `
            ${op.description}<br><br>
            <strong>Investment:</strong> $${op.investment.toLocaleString()}<br>
            <strong>Location:</strong> ${op.location}<br>
            <strong>Category:</strong> ${op.category}
          `;
          window.appModal.openModal(op.title, body);
        }
      })
    );

    document.querySelectorAll('.save').forEach(btn =>
      btn.addEventListener('click', e => {
        const id = Number(e.currentTarget.dataset.id);
        saveOpp(id);
        e.currentTarget.textContent = 'Saved ✓';
        e.currentTarget.disabled = true;
      })
    );
  }

  /* ------------------------------------------------------------
     Saved Items (localStorage)
  ------------------------------------------------------------ */
  function getSaved() {
    return JSON.parse(localStorage.getItem('savedOpps') || '[]');
  }

  function saveOpp(id) {
    const saved = getSaved();
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem('savedOpps', JSON.stringify(saved));
    }
  }

  /* ------------------------------------------------------------
     Category Dropdown
  ------------------------------------------------------------ */
  function populateCategories(list, select) {
    const cats = [...new Set(list.map(i => i.category))].sort();
    select.innerHTML =
      `<option value="all">All</option>` +
      cats.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  /* ------------------------------------------------------------
     Sorting Logic
  ------------------------------------------------------------ */
  function applySort(list) {
    const mode = sortSelect.value;

    if (mode === 'investment-asc')
      return [...list].sort((a, b) => a.investment - b.investment);

    if (mode === 'investment-desc')
      return [...list].sort((a, b) => b.investment - a.investment);

    // saved first
    const saved = getSaved();
    return [...list].sort((a, b) => {
      const aSaved = saved.includes(a.id);
      const bSaved = saved.includes(b.id);
      return Number(bSaved) - Number(aSaved);
    });
  }
}
