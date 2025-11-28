/**
 * Simple client-side storage helper for reviews.
 */
window.ReviewStore = (function () {
  const STORAGE_KEY = "portalReviews";

  const getAll = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (err) {
      console.error("Failed to parse stored reviews", err);
      return [];
    }
  };

  const saveAll = (entries) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 50)));
  };

  const add = (name, review) => {
    const entries = getAll();
    const entry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name,
      review,
      createdAt: new Date().toISOString(),
    };
    entries.unshift(entry);
    saveAll(entries);
    return entry;
  };

  const clear = () => localStorage.removeItem(STORAGE_KEY);

  return { getAll, add, clear };
})();

