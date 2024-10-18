import React from 'react';
import useFormValidation from '../../hooks/useFormValidation.jsx';

// Wiederverwendbare FormField-Komponente
const FormField = ({ label, name, value, onChange, error, type = 'text', isTextArea = false }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}:</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md"
      />
    )}
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

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
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Anamnese</h2>

        {/* Wiederverwendbare FormField-Komponenten */}
        <FormField
          label="Allergien"
          name="allergies"
          value={formValues.allergies}
          onChange={handleChange}
          error={errors.allergies}
        />

        <FormField
          label="Medikamente"
          name="medication"
          value={formValues.medication}
          onChange={handleChange}
          error={errors.medication}
        />

        <FormField
          label="Vorerkrankungen"
          name="medicalHistory"
          value={formValues.medicalHistory}
          onChange={handleChange}
          error={errors.medicalHistory}
          isTextArea={true}  // TextArea für längeren Text
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Absenden
        </button>
      </form>
    </>
  );
};

export default AnamneseForm;
