// import { ErrorMessage } from './Message'
// import validate from 'validate.js'

// let constraints = {
//   phone: {
//     presence: {
//       message: ErrorMessage.phoneBlank,
//     },
//     length: {
//       minimum: 12,
//       maximum: 12,
//       message: ErrorMessage.phoneLength,
//     },
//     format: {
//       pattern:
//         /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
//       message: ErrorMessage.phoneInvalid,
//     },
//   },

//   password: {
//     presence: {
//       message: ErrorMessage.passwordBlank,
//     },
//     length: {
//       minimum: 8,
//       message: ErrorMessage.passwordLength,
//     },
//     format: {
//       pattern:
//         /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&_*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//       message: ErrorMessage.passwordInvalid,
//     },
//   },
//   confirmPassword: {
//     presence: {
//       message: ErrorMessage.passwordBlank,
//     },
//     length: {
//       minimum: 8,
//       message: ErrorMessage.passwordLength,
//     },
//     format: {
//       pattern:
//         /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&_*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//       message: ErrorMessage.passwordInvalid,
//     },
//   },
//   fullName: {
//     presence: {
//       message: ErrorMessage.fullNameBlank,
//     },
//     format: {
//       pattern: /^[a-zA-Z ]*$/,
//       message: ErrorMessage.nameInvalid,
//     },
//   },
//   email: {
//     presence: {
//       message: ErrorMessage.emailBlank,
//     },
//     format: {
//       pattern:
//         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//       message: ErrorMessage.emailInvalid,
//     },
//   },

//   firstName: {
//     presence: {
//       message: ErrorMessage.firstNameBlank,
//     },
//     length: {
//       maximum: 50,
//       tooLong: ErrorMessage.firstNameLength,
//     },
//     format: {
//       pattern: /^[a-zA-Z\s]*$/,
//       message: ErrorMessage.firstNameInvalid,
//     },
//   },
//   lastName: {
//     presence: {
//       message: ErrorMessage.lastNameBlank,
//     },
//     length: {
//       maximum: 50,
//       tooLong: ErrorMessage.lastNameLength,
//     },
//     format: {
//       pattern: /^[a-zA-Z\s]*$/,
//       message: ErrorMessage.lastNameInvalid,
//     },
//   },

//   cardNumber: {
//     presence: {
//       message: ErrorMessage.cardNumberBlank,
//     },
//     format: {
//       pattern: /^[0-9]*$/,
//       message: ErrorMessage.cardNumberInvalid,
//     },
//     length: {
//       maximum: 16,
//       minimum: 14,
//       notValid: ErrorMessage.cardNumberInvalid,
//     },
//   },

//   cardCVV: {
//     presence: {
//       message: ErrorMessage.cardCVVBlank,
//     },
//     format: {
//       pattern: /^[0-9]*$/,
//       message: ErrorMessage.cardCVVInvalid,
//     },
//     length: {
//       maximum: 4,
//       minimum: 3,
//       notValid: ErrorMessage.cardCVVInvalid,
//     },
//   },
// }

// export function validation(fieldName, value) {
//   let formValues = {}
//   formValues[fieldName] = value === '' ? null : value

//   let formFields = {}
//   formFields[fieldName] = constraints[fieldName]

//   let result = validate(formValues, formFields, { fullMessages: false })

//   if (result) {
//     return result[fieldName][0]
//   }
//   return null
// }

// let PasswordConstraints = {
//   confirmPassword: {
//     equality: {
//       attribute: 'password',
//       message: ErrorMessage.confirmPasswordNotMatch,
//     },
//   },
// }

// /**
//  * @return {null}
//  */
// export function PasswordValidation(password, confirmPassword) {
//   let result1 = validate(
//     {
//       password: password,
//       confirmPassword: confirmPassword,
//     },
//     PasswordConstraints,
//     { fullMessages: false },
//   )

//   if (result1 !== null && result1 !== undefined) {
//     if (result1['confirmPassword'] !== undefined)
//       return result1['confirmPassword'][0]
//   }
//   return null
// }
