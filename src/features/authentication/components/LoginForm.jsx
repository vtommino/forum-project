import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validators/validateLogin";
import { AxiosError } from "axios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialInput = {
  emailOrMobile: "",
  password: "",
};

const initialInputError = {
  emailOrMobile: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      }
      setInputError(initialInputError);
      await login(input);
      navigate("/forum");
      toast.success("Logged in successfully!");
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        const message =
          err.response.status === 400
            ? "Invalid email or mobile or password."
            : "Internal server error.";
        return toast.error(message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-4">
        <div className="text-center">
          <div className="text-2xl font-semibold">Log-in for Vtara36 Forum</div>
        </div>
        <div>
          <Input
            placeholder="E-mail, mobile number or username"
            name="emailOrMobile"
            value={input.emailOrMobile}
            onChange={handleChangeInput}
            error={inputError.emailOrMobile}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div className="flex justify-center">
          <Button bg="green" color="white">
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
}
