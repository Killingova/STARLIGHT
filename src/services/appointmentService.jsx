// src/services/appointmentService.js
import axios from 'axios';

const getServerIp = () => {
  return localStorage.getItem('serverIp') || 'localhost';
};

const api = axios.create({
  baseURL: `http://${getServerIp()}:5000`,
  timeout: 10000,
});

const appointmentService = {
  getAppointments: () => api.get('/appointments'),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  // Weitere Methoden...
};

export default appointmentService;
