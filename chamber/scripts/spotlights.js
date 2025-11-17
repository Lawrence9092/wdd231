// Assuming your JSON data is structured like this:
const jsonUrl = "https://example.com/api/chamber-members"; // replace with actual URL

async function getSpotlightMembers() {
  try {
    // Fetch member data from the JSON source
    const response = await fetch(jsonUrl);
    const data = await response.json();

    // Filter members to only include gold or silver members
    const spotlightMembers = data.filter(member => 
      member.membershipLevel === 'gold' || member.membershipLevel === 'silver'
    );

    // Randomly select 2 or 3 members
    const randomSpotlights = getRandomMembers(spotlightMembers, 2, 3);

    // Display the spotlight members
    displaySpotlights(randomSpotlights);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to randomly select a number of members
function getRandomMembers(members, min, max) {
  const numSpotlights = Math.floor(Math.random() * (max - min + 1)) + min;
  const selectedMembers = [];

  while (selectedMembers.length < numSpotlights) {
    const randomIndex = Math.floor(Math.random() * members.length);
    const member = members[randomIndex];
    if (!selectedMembers.includes(member)) {
      selectedMembers.push(member);
    }
  }

  return selectedMembers;
}

// Function to display the spotlight members
function displaySpotlights(members) {
  const spotlightContainer = document.getElementById("spotlight-container"); // Corrected ID
  spotlightContainer.innerHTML = ""; // Clear any previous spotlights

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <div class="spotlight-header">
        <img src="${member.logo}" alt="${member.companyName} logo" class="logo">
        <h3 class="company-name">${member.companyName}</h3>
        <span class="membership-level">${member.membershipLevel.charAt(0).toUpperCase() + member.membershipLevel.slice(1)} Member</span>
      </div>
      <div class="spotlight-body">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      </div>
    `;

    spotlightContainer.appendChild(card);
  });
}

// Run the function when the page loads
window.onload = getSpotlightMembers;


// Run the function when the page loads
window.onload = getSpotlightMembers;


loadSpotlights();
