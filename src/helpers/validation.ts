import Block from "../modules/block";

const validationPatterns = {
  login: /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
  phone: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{10,15}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
  message: /.+/,
};

function inputValidation(value: string | number, pattern: RegExp) {
  const regexp = new RegExp(pattern);
  if (!value) {
    return false;
  }
  return regexp.test(String(value));
}

export function loginValidation() {
  const value = arguments[0];
  const isValid = inputValidation(value, validationPatterns.login);
  if (!isValid) {
    return "Некорректный логин";
  }
}

export function phoneValidation() {
  const value = arguments[0];
  const isValid = inputValidation(value, validationPatterns.phone);
  if (!isValid) {
    return "Некоректный номер";
  } else {
    return undefined;
  }
}

export function emailValidation() {
  const value = arguments[0];
  const isValid = inputValidation(value, validationPatterns.email);
  if (!isValid) {
    return "Некоректный email";
  }
}

export function nameValidation() {
  const value = arguments[0];
  const isValid = inputValidation(value, validationPatterns.name);
  if (!isValid) {
    return "Некоректное Имя";
  }
}

export function passwordValidation() {
  const value = arguments[0];
  const isValid = inputValidation(value, validationPatterns.password);
  if (!isValid) {
    return "Некоректный пароль";
  }
}

export function messageValidation() {
  const value = arguments[0];
  const isValid = inputValidation(value, validationPatterns.message);
  if (!isValid) {
    return "Сообщение не может быть пустым";
  }
}

export const formValidation: {
  [key in string]: (value: unknown) => string | undefined;
} = {
  login: loginValidation,
  password: passwordValidation,
  newPassword: passwordValidation,
  confirmPassword: passwordValidation,
  oldPassword: passwordValidation,
  phone: phoneValidation,
  email: emailValidation,
  message: messageValidation,
  first_name: nameValidation,
  second_name: nameValidation,
};

export function onSubmitValidation(
  formData: Record<string, string | number>,
  children: Record<string, Block>
): boolean {
  let errorCount = 0;

  for (const formDataKey in formData) {
    const component = Object.entries(children).find(([_, component]) => {
      return (
        component.getProps()?.validation &&
        component.getProps().validation === formDataKey
      );
    });

    if (component) {
      const [_, child] = component;
      const errors = formValidation[formDataKey](formData[formDataKey]);

      if (errors) {
        errorCount++;
      }

      child.errors = errors;
      child.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  return !!errorCount;
}
