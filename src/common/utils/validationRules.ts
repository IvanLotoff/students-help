import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.имя) {
    console.log("if (!values.name)" + !values.имя)
    errors.имя = "обязательно";
  }
  if (!values.телеграм) {
    console.log("if (!values.email)" + !values.имя)
    errors.телеграм = "обязательно";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  }
  if (!values.задание) {
    console.log("if (!values.Задание)"+ JSON.stringify(values))
    errors.задание = "обязательно";
  }
  return errors;
}
