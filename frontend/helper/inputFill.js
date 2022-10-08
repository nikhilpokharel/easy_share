export const fillForm = ({ e, setFormData }) => {
  const { name, value } = e.target;
  setFormData((prevValue) => {
    return {
      ...prevValue,
      [name]: value,
    };
  });
};

export const emptyForm = (formData, setFormData) => {
  const emptyFormData = new Object();
  Object.entries(formData).map(([key, value]) => {
    emptyFormData[key] = "";
  });
  setFormData(emptyFormData);
};
