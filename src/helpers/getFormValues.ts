export default function getFormValues() {
  const fields = document.querySelectorAll("input");
  const values: Record<string, string> = {};

  fields.forEach((field) => {
    values[field.name] = field.value;
  });

  return values;
}
