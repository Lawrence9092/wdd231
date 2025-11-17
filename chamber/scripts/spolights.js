async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  // Filter for gold & silver
  const filtered = data.members.filter(m => 
    m.membership === "Gold" || m.membership === "Silver"
  );

  // Randomize
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const container = document.getElementById("spotlight-container");
  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} logo">
      <h4>${member.name}</h4>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>${member.membership} Member</strong></p>
    `;

    container.appendChild(card);
  });
}

loadSpotlights();
