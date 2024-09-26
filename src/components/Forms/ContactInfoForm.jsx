// src/components/Forms/ContactInfoForm.jsx
import React from 'react';
import useFormValidation from '../../hooks/useFormValidation.jsx';

const ContactInfoForm = () => {
  const { formValues, errors, handleChange, validate } = useFormValidation({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Kontaktinformationen:', formValues);
      // Hier kannst du die Daten an das Backend senden
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Kontaktinformationen</h2>
      
      {/* Eingabefeld für Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      {/* Eingabefeld für E-Mail */}
      <div className="mb-4">
        <label className="block text-gray-700">E-Mail:</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* Eingabefeld für Telefonnummer */}
      <div className="mb-4">
        <label className="block text-gray-700">Telefonnummer:</label>
        <input
          type="tel"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Absenden
      </button>
    </form>
  );
};

export default ContactInfoForm;
