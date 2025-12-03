// data.mjs — fetch wrapper using try...catch
export async function fetchOpportunities(url = './data/opportunities.json') {
  try {
    const res = await fetch(url, {cache: "no-cache"});
    if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('fetchOpportunities error:', err);
    return [];
  }
}
