export async function fetchOpportunities(url = './data/opportunities.json'){
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Network response not ok (${res.status})`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch opportunities:', err);
    // Return empty array so callers can still work
    return [];
  }
}
