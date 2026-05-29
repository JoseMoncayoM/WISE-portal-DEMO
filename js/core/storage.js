window.WisdomStorage = {
  get(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined || raw === '') return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch (error) {
      console.error('WisdomStorage.get error:', key, error);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('WisdomStorage.set error:', key, error);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  exists(key) {
    return localStorage.getItem(key) !== null;
  },

  clear() {
    localStorage.clear();
  }
};