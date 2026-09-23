export async function getTasks() {
  const response = await fetch(`${import.meta.env.BASE_URL}tasks.json`);
  if (!response.ok) {
    throw new Error('Error loading data');
  }
  return response.json();
}