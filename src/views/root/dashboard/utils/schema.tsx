import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  username: Yup.string().required("required"),
  name: Yup.string().required("required"),
  email: Yup.string().email().required("required"),
  phone: Yup.string().required("required"),
  user_type: Yup.string().required("required"),
});
