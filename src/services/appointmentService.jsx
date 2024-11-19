// src/services/appointmentService.jsx

// Da Sie mit Mock-Daten arbeiten, simulieren wir die API-Aufrufe hier.
// Später können Sie diese Implementierung durch echte API-Aufrufe ersetzen.

const appointmentData = [
  // Mock-Termine
  {
    id: "012345678901234",
    patientId: 1,
    date: "2023-10-15",
    time: "10:00",
    doctor: "Dr. Müller",
    isValid: true,
    simulatedTimeDifference: 0,
  },
  {
    id: "123456789012345",
    patientId: 2,
    date: "2023-10-16",
    time: "11:00",
    doctor: "Dr. Schmidt",
    isValid: true,
    simulatedTimeDifference: 20,
  },
  {
    id: "234567890123456",
    patientId: 1,
    date: "2023-10-17",
    time: "09:30",
    doctor: "Dr. Meyer",
    isValid: true,
    simulatedTimeDifference: -25,
  },
  {
    id: "345678901234567",
    patientId: 2,
    date: "2023-10-18",
    time: "11:15",
    doctor: "Dr. Klein",
    isValid: false,
  },
  {
    id: "456789012345678",
    patientId: 1,
    date: "2023-10-19",
    time: "14:00",
    doctor: "Dr. Schulz",
    isValid: true,
    simulatedTimeDifference: 10,
  },
];

// Simulieren eines Services zur Terminbestätigung basierend auf den QR-Code-Daten
const appointmentService = {
  confirmAppointment: (qrCodeData) => {
    return new Promise((resolve, reject) => {
      // Simulieren einer Netzwerkverzögerung
      setTimeout(() => {
        // Suchen des Termins anhand der ID
        const appointment = appointmentData.find((app) => app.id === qrCodeData);

        if (appointment) {
          if (appointment.isValid) {
            resolve(appointment);
          } else {
            reject(new Error('Der Termin ist ungültig.'));
          }
        } else {
          reject(new Error('Kein Termin für den gegebenen QR-Code gefunden.'));
        }
      }, 500); // Simulierte Verzögerung von 500ms
    });
  },
};

export default appointmentService;
