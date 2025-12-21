import { useState } from "react";

const usePasswordInputField = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return { showPassword, handleShowPassword };
};

export default usePasswordInputField;
