// src/utils/helpers.jsx

/**
 * Funktion zur Formatierung von Daten (Beispiel: Datumsformatierung).
 * @param {Date} date - Das Datum, das formatiert werden soll.
 * @returns {string} - Das formatierte Datum als String.
 */
export const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('de-DE', options);
  };
  
  /**
   * Funktion zur Überprüfung, ob ein Objekt leer ist.
   * @param {Object} obj - Das zu prüfende Objekt.
   * @returns {boolean} - True, wenn das Objekt leer ist, sonst false.
   */
  export const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0;
  };
  
  /**
   * Funktion zur Speicherung von Daten im Local Storage.
   * @param {string} key - Der Schlüssel, unter dem die Daten gespeichert werden.
   * @param {any} value - Die zu speichernden Daten.
   */
  export const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Fehler beim Speichern im Local Storage:', error);
    }
  };
  
  /**
   * Funktion zum Abrufen von Daten aus dem Local Storage.
   * @param {string} key - Der Schlüssel, unter dem die Daten gespeichert sind.
   * @returns {any} - Die gespeicherten Daten oder null, wenn sie nicht gefunden werden.
   */
  export const getFromLocalStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Fehler beim Abrufen aus dem Local Storage:', error);
      return null;
    }
  };
  
  /**
   * Funktion zur Entfernung von Daten aus dem Local Storage.
   * @param {string} key - Der Schlüssel, unter dem die Daten gespeichert sind.
   */
  export const removeFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Fehler beim Entfernen aus dem Local Storage:', error);
    }
  };
  
  /**
   * Funktion zur Anzeige von Benachrichtigungen (z.B. für Erfolg oder Fehler).
   * @param {string} message - Die anzuzeigende Nachricht.
   * @param {string} type - Der Typ der Benachrichtigung (z.B. 'success' oder 'error').
   */
  export const showNotification = (message, type = 'info') => {
    // Beispiel für die Verwendung eines Notification-Systems (z.B. Toast):
    console.log(`Notification (${type}): ${message}`);
    // Hier könntest du deine Notification-Komponente verwenden, z.B.:
    // toast[type](message);
  };
  