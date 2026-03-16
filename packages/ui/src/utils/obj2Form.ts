export function obj2Form<T extends object>(
  obj: T,
  form?: FormData,
  parentKey?: string,
): FormData {
  const formData = form || new FormData();

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key as keyof T];
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value === null || value === undefined) {
      formData.append(formKey, '');
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (Array.isArray(value)) {
      value.forEach((v, index) => {
        if (typeof v === 'object' && v !== null) {
          obj2Form(v, formData, `${formKey}[${index}]`);
        } else {
          formData.append(`${formKey}[${index}]`, String(v));
        }
      });
    } else if (typeof value === 'object') {
      obj2Form(value, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  }

  return formData;
}
