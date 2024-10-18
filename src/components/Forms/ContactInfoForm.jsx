import React from 'react';
import useFormValidation from '../../hooks/useFormValidation.jsx';

// Wiederverwendbare FormField-Komponente
const FormField = ({ label, name, value, onChange, error, type = 'text' }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

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
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Kontaktinformationen</h2>

        {/* Wiederverwendbare FormField-Komponenten */}
        <FormField
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormField
          label="E-Mail"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          error={errors.email}
          type="email"
        />

        <FormField
          label="Telefonnummer"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          error={errors.phone}
          type="tel"
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

export default ContactInfoForm;
