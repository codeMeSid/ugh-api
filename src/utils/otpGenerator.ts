export function otpGenerator(digits = 4) {
  return Math.round(Math.random() * 10 ** digits);
}
