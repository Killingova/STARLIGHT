// src/utils/constants.jsx

// API-URL-Konstanten (Entwicklung/Produktion basierend auf der Umgebung)
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000' // Lokale Entwicklung
  : 'https://api.example.com'; // Produktion

export const QR_CODE_API_ENDPOINT = `${API_BASE_URL}/qr-code`;
export const EGK_API_ENDPOINT = `${API_BASE_URL}/egk-verification`;
export const ANAMNESE_API_ENDPOINT = `${API_BASE_URL}/anamnese`;
export const AUTH_API_ENDPOINT = `${API_BASE_URL}/auth`;

// Lokale Storage-Schlüssel
export const LOCAL_STORAGE_KEYS = {
  ADMIN_SETTINGS: 'admin_settings',
  USER_TOKEN: 'user_token',
  PROGRESS_STATUS: 'progress_status',
};

// Fehler- und Erfolgsmeldungen
export const MESSAGES = {
  SUCCESS_QR_SCAN: 'Der QR-Code wurde erfolgreich gescannt.',
  ERROR_QR_SCAN: 'Es gab ein Problem beim Scannen des QR-Codes. Bitte versuchen Sie es erneut.',
  SUCCESS_EGK_VERIFICATION: 'Die eGK-Daten wurden erfolgreich verifiziert.',
  ERROR_EGK_VERIFICATION: 'Die eGK konnte nicht gelesen werden. Bitte versuchen Sie es erneut.',
  SUCCESS_ANAMNESE_SUBMIT: 'Die Anamnesedaten wurden erfolgreich übermittelt.',
  ERROR_ANAMNESE_SUBMIT: 'Beim Übermitteln der Anamnesedaten ist ein Fehler aufgetreten.',
  LOGIN_REQUIRED: 'Bitte melden Sie sich an, um auf das Admin-Panel zuzugreifen.',
  UNAUTHORIZED_ACCESS: 'Sie haben keine Berechtigung für diesen Zugriff.',
};

// UI-Konstanten
export const PROGRESS_STEPS = {
  START: 'Anmeldung',
  QR_CODE_SCAN: 'QR-Code scannen',
  EGK_VERIFICATION: 'eGK-Verifikation',
  ANAMNESE_FORM: 'Anamnese ausfüllen',
  COMPLETE: 'Prozess abgeschlossen',
};

// Farben und Styles
export const COLORS = {
  PRIMARY: '#3490dc',
  SECONDARY: '#ffed4a',
  SUCCESS: '#38c172',
  ERROR: '#e3342f',
  WARNING: '#f6993f',
};

// Konfigurationswerte
export const CONFIG = {
  CAMERA_SWITCH: true, // Möglichkeit, zwischen Front- und Rückkamera zu wechseln
  KIOSK_MODE: true, // Kiosk-Modus aktiviert oder nicht
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 Minuten Timeout
};

// Rollen und Berechtigungen
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Zustandsschritte des Check-In-Prozesses
export const CHECK_IN_STATUS = {
  NOT_STARTED: 0,
  QR_CODE_SCANNED: 25,
  EGK_VERIFIED: 50,
  ANAMNESE_COMPLETED: 75,
  PROCESS_COMPLETE: 100,
};

// Placeholder-Texte und Labels
export const PLACEHOLDERS = {
  USERNAME: 'Benutzername eingeben...',
  PASSWORD: 'Passwort eingeben...',
};

// Formvalidierungen und Fehlertexte
export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: 'Dieses Feld ist erforderlich.',
  INVALID_EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  MIN_LENGTH: (min) => `Bitte geben Sie mindestens ${min} Zeichen ein.`,
};
