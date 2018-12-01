export async function loadJSON(url) {
  const data = await fetch(url);
  return data.json();
}
