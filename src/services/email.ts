const EMAIL_KEY_NAME = 'six-cities-email';

export const saveEmail = (email: string): void => {
  localStorage.setItem(EMAIL_KEY_NAME, email);
};

export const getEmail = (): string => {
  const token = localStorage.getItem(EMAIL_KEY_NAME);
  return token ?? '';
};


export const dropEmail = (): void => {
  localStorage.removeItem(EMAIL_KEY_NAME);
};
