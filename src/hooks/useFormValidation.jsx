// src/hooks/useFormValidation.jsx
import { useState } from 'react';

// Funktion für Validierung von Formularfeldern
const useFormValidation = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handler für Eingabewerte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handler für Validierung der Eingaben
  const validate = () => {
    const newErrors = {};

    // Beispiel für einfache Validierung
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        newErrors[key] = `${key} darf nicht leer sein.`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formValues,
    errors,
    handleChange,
    validate,
  };
};

export default useFormValidation;
