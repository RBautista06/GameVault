const API_KEY = "6076c8546c984697913f086fc882f6c3";
const BASE_URL = "https://api.rawg.io/api";
//remove the s so after the design phase
export async function getGames(search = '', page = 1) {
  const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(search)}&page=${page}&page_size=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch games');
  return await res.json();
}
