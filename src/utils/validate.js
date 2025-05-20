export const checkValidData = (email, password, name) => {
  // using regex for validation and using inbuilt .test() method
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/.test(name);

  if (!isEmailValid) return "Email Invalid";
  if (!isPasswordValid) return "Password Invalid";
  if (!isNameValid) return "Name Invalid";

  return null;
};
