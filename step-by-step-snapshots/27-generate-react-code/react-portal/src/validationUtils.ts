// GH Copilot code - starts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:;'<>,.?]).{8,255}$/;
  return passwordRegex.test(password);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\- ]{10,20}$/;
  return phoneRegex.test(phone);
};

export const isValidName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z ]+$/;
  return name.length > 0 && nameRegex.test(name);
};
// GH Copilot code - end