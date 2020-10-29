export const validateRga = (rga) => {
  const regex = new RegExp(/^(\d{4}[.]\d{4}[.]\d{3}[-]\d)$/);
  return regex.test(rga);
};
