// export const generateVerificationCode = (length = 6): string => {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let verificationCode = ""; // 6 digit ka code isi me store hoga
//   const charactersLength = characters.length;

//   for (let i = 0; i < length; i++) {
//     verificationCode += characters.charAt(
//       Math.floor(Math.random() * charactersLength)
//     );
//   }

//   return verificationCode;
// };

export const generateVerificationCode = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verificationCode = "";
  // chọn vị trí ngẫu nhiên từ 0 -> 61
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    // Lấy kí tự tại vị trí đó
    const randomChar = characters[randomIndex];
    // ghép chuỗi vào kết quả
    verificationCode += randomChar;
  }
  return verificationCode;
};
