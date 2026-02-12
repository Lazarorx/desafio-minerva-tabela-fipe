// Service para gerenciar LocalStorage

const STORAGE_KEYS = {
  USER: 'fipecheck_user',
  HISTORY: 'fipecheck_history',
  FAVORITES: 'fipecheck_favorites',
  COMPARISONS: 'fipecheck_comparisons',
  THEME: 'fipecheck_theme',
};

class StorageService {
  // User
  saveUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // History
  saveToHistory(vehicle) {
    const history = this.getHistory();
    const newEntry = {
      id: Date.now(),
      ...vehicle,
      consultedAt: new Date().toISOString(),
    };
    
    // Adiciona no início e limita a 20
    const updatedHistory = [newEntry, ...history].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
  }

  getHistory() {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  }

  deleteFromHistory(id) {
    const history = this.getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  }

  clearHistory() {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
  }

  // Favorites
  addToFavorites(vehicle) {
    const favorites = this.getFavorites();
    const newFavorite = {
      id: Date.now(),
      ...vehicle,
      favoritedAt: new Date().toISOString(),
    };
    
    const updated = [newFavorite, ...favorites];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  }

  getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  }

  removeFromFavorites(id) {
    const favorites = this.getFavorites();
    const updated = favorites.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  }

  isFavorite(marca, modelo, ano) {
    const favorites = this.getFavorites();
    return favorites.some(
      fav => fav.Marca === marca && fav.Modelo === modelo && fav.AnoModelo === ano
    );
  }

  // Comparisons
  addToComparison(vehicle) {
    const comparisons = this.getComparisons();
    
    // Limita a 3 veículos
    if (comparisons.length >= 3) {
      return false;
    }
    
    const newComparison = {
      id: Date.now(),
      ...vehicle,
    };
    
    const updated = [...comparisons, newComparison];
    localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(updated));
    return true;
  }

  getComparisons() {
    const comparisons = localStorage.getItem(STORAGE_KEYS.COMPARISONS);
    return comparisons ? JSON.parse(comparisons) : [];
  }

  removeFromComparison(id) {
    const comparisons = this.getComparisons();
    const updated = comparisons.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(updated));
  }

  clearComparisons() {
    localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify([]));
  }

  // Theme
  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  }
}

export default new StorageService();
