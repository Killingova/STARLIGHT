// Klasse, die den Zugriff auf den LocalStorage kapselt
export class LocalStore {
    // Methode zum Speichern eines Werts im LocalStorage
    static save(key: string, value: any): void {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Fehler beim Speichern im LocalStorage:', error);
      }
    }
  
    // Methode zum Abrufen eines Werts aus dem LocalStorage
    static get(key: string): any {
      try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
          return null;
        }
        return JSON.parse(serializedValue);
      } catch (error) {
        console.error('Fehler beim Abrufen aus dem LocalStorage:', error);
        return null;
      }
    }
  
    // Methode zum Löschen eines Werts aus dem LocalStorage
    static remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Fehler beim Löschen aus dem LocalStorage:', error);
      }
    }
  }
  
  export default LocalStore;