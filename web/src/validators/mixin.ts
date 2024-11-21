import { get, toNumber } from "lodash";
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from "react-admin";

export const validateName = [required(), minLength(2), maxLength(15), regex(/^(?!\s*$).+/g, "请输入有效字符")];
export const validateTel = [regex(/[\d-]+/g, "仅允许输入数字或 -")];
export const validateAddress = [];
export const validateFirstName = [required(), minLength(2), maxLength(15)];
export const validateEmail = [email()];
export const validateAge = [number(), minValue(18)];
export const validate999Quantity = [number(), minValue(0), maxValue(999)];
export const validateZipCode = regex(/^\d{5}$/, "邮编格式不正确");
export const validateGender = choices(["m", "f", "nc"], "Please choose one of the values");
export const validateDuplicateArray = (arrayName: string, arrayFieldIdName: string) => {
  return (value: any, values: any, props: any) => {
    const [, index] = props.source.split(".");
    const array = get(values, arrayName, []);
    for (var i = 0; i < array.length && i < toNumber(index); i++) {
      if (value === get(array, `[${i}].${arrayFieldIdName}`)) {
        return `不能使用与第[${i + 1}]项重复的属性`;
      }
    }
  };

  // each(get(values.properties)，() => {

  // })
  // props.properties
  // console.log(value);
  // console.log(values);
  // console.log(props);
  // return null;
};

export const validateRange = (min: number = 0, max: number) => {
  return [number(), minValue(min), maxValue(max)];
};

export default {
  validateName,
  validateTel,
  validateFirstName,
  validateEmail,
  validateAddress,
  validateZipCode,
  validateGender,
};
