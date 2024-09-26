// src/pages/FormPage.jsx
import React from 'react';
import AnamneseForm from '../components/Forms/AnamneseForm.jsx';
import ContactInfoForm from '../components/Forms/ContactInfoForm.jsx';

const FormPage = () => {
  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Formulare</h1>
      <ContactInfoForm /> {/* Anzeige des Kontaktformulars */}
      <AnamneseForm /> {/* Anzeige des Anamneseformulars */}
    </div>
  );
};

export default FormPage;
