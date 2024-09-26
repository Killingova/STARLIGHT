// src/components/Forms/AnamneseForm.jsx
import React from 'react';
import useFormValidation from '../../hooks/useFormValidation.jsx';

const AnamneseForm = () => {
  const { formValues, errors, handleChange, validate } = useFormValidation({
    allergies: '',
    medication: '',
    medicalHistory: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulardaten:', formValues);
      // Hier kannst du die Daten an das Backend senden
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Anamnese</h2>
      
      {/* Eingabefeld für Allergien */}
      <div className="mb-4">
        <label className="block text-gray-700">Allergien:</label>
        <input
          type="text"
          name="allergies"
          value={formValues.allergies}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.allergies && <p className="text-red-500">{errors.allergies}</p>}
      </div>

      {/* Eingabefeld für Medikamente */}
      <div className="mb-4">
        <label className="block text-gray-700">Medikamente:</label>
        <input
          type="text"
          name="medication"
          value={formValues.medication}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.medication && <p className="text-red-500">{errors.medication}</p>}
      </div>

      {/* Eingabefeld für Vorerkrankungen */}
      <div className="mb-4">
        <label className="block text-gray-700">Vorerkrankungen:</label>
        <textarea
          name="medicalHistory"
          value={formValues.medicalHistory}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.medicalHistory && <p className="text-red-500">{errors.medicalHistory}</p>}
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

export default AnamneseForm;
