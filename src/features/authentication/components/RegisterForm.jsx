import React, { useState } from "react";
import Input from "../../../components/Input";
import SelectInput from "../../../components/SelectInput";
import Button from "../../../components/Button";
import validateRegister from "../validators/validateRegister";
import authApi from "../../../api/auth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const building = [
  { title: "Select Building", value: "selectBld" },
  { title: "Building A", value: "A" },
  { title: "Building B", value: "B" },
  { title: "Building C", value: "C" },
  { title: "Building D", value: "D" },
  { title: "Building E", value: "E" },
];

const gender = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Others", value: "others" },
];

function RadioButtons({ name, onChange, value, error }) {
  const [selectedOption, setSelectedOption] = useState("");

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <>
      <div className="p-3 bg-yellow-100 rounded-lg">
        <div className="font-semibold">&nbsp;Resident Status</div>
        <div className="flex justify-around items-center">
          <label>
            <input
              type="radio"
              value="CO_OWNER"
              name={name}
              checked={value === "CO_OWNER"}
              onChange={onChange}
            />
            &nbsp; Co-owner
          </label>
          <label>
            <input
              type="radio"
              value="CO_HABITANT"
              name={name}
              checked={value === "CO_HABITANT"}
              onChange={onChange}
            />
            &nbsp; Co-habitant
          </label>
          <label>
            <input
              type="radio"
              value="RENTEE"
              name={name}
              checked={value === "RENTEE"}
              onChange={onChange}
            />
            &nbsp; Rentee
          </label>
        </div>
      </div>
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}

const initialInput = {
  firstName: "",
  lastName: "",
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
  building: "selectBld",
  roomNumber: "",
  residentType: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
  building: "",
  roomNumber: "",
  residentType: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (e) => {
    setInputError(initialInputError);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);

      if (error) {
        return setInputError(error);
      }

      await authApi.register(input);
      onSuccess();
      toast.success(
        "Forum user applicant sent to admin for approval, please check your email."
      );
      setInputError({ ...initialInput });
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        if (err.response.data.field === "emailOrMobile")
          setInputError((prev) => ({
            ...prev,
            emailOrMobile: "This email or mobile has already been used.",
          }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="First Name"
              name="firstName"
              onChange={handleChangeInput}
              value={input.firstName}
              error={inputError.firstName}
            />
          </div>
          <div>
            <Input
              placeholder="Last Name"
              name="lastName"
              onChange={handleChangeInput}
              value={input.lastName}
              error={inputError.lastName}
            />
          </div>
        </div>
        <div>
          <Input
            placeholder="Email Address or Mobile Number"
            width="full"
            name="emailOrMobile"
            onChange={handleChangeInput}
            value={input.emailOrMobile}
            error={inputError.emailOrMobile}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            name="password"
            onChange={handleChangeInput}
            value={input.password}
            type="password"
            error={inputError.password}
          />
        </div>
        <div>
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChangeInput}
            value={input.confirmPassword}
            type="password"
            error={inputError.confirmPassword}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col">
            <SelectInput
              input={building}
              name="building"
              onChange={handleChangeInput}
              value={input.building}
              error={inputError.building}
            />
          </div>
          <div>118 / &nbsp;</div>
          <div className="flex flex-col">
            <Input
              placeholder="3-digit room no."
              name="roomNumber"
              onChange={handleChangeInput}
              value={input.roomNumber}
              error={inputError.roomNumber}
              widthStyle="150px"
            />
          </div>
        </div>
        <div>
          <RadioButtons
            name="residentType"
            onChange={handleChangeInput}
            value={input.residentType}
            error={inputError.residentType}
          />
        </div>
        <div className="col-span-2 text-center">
          <Button bg="green">Register</Button>
        </div>
      </div>
    </form>
  );
}
