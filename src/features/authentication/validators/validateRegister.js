import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": '"First Name" must be filled.' }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": '"Last Name" must be filled.' }),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).messages({
    "alternatives.match": 'Invalid "email address" or "mobile number."',
  }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{8,15}$/)
    .messages({
      "string.empty": '"Password" is required.',
      "string.pattern.base":
        "Password must be 8-15 characters (alphabets or numbers only).",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm password is required.",
    "any.only": "Password and confirm password did not match!",
  }),
  building: Joi.string().required().valid("A", "B", "C", "D", "E").messages({
    "string.empty": "Select your building.",
  }),
  roomNumber: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required()
    .messages({
      "string.empty": "Insert 3 digits.",
      "string.pattern.base": "*Use 3 digits (ex.118/14 = 014)",
    }),
  residentType: Joi.string()
    .required()
    .messages({ "string.empty": "Select your resident status." }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  console.dir(error);
  //check that error must not be undefined, then it will do the reduce
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
