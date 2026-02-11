export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
};

export const addToWatchlist = (item) => {
  const list = getWatchlist();
  const exists = list.find((i) => i.id === item.id);
  if (!exists) {
    localStorage.setItem("watchlist", JSON.stringify([...list, item]));
  }
};

export const removeFromWatchlist = (id) => {
  const updated = getWatchlist().filter((i) => i.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(updated));
};
