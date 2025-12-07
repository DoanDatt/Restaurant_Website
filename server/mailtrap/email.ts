import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  // Tạo 1 mảng chứ object với email người nhận
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender, // người gửi
      to: recipient, // người nhận
      subject: "Verify your email!", // tiêu đề email
      html: htmlContent.replace("{verificationToken}", verificationToken), // gán dữ liệu verificationToken vào trong email
      category: "Email Verification", // Phân loại email
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (name: string, email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome your email!",
      html: htmlContent,
      template_variables: {
        company_info_name: "PatelEats",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email!");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password!",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to sendPasswordResetEmail");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = client.send({
      from: sender,
      to: recipient,
      subject: "Reset Success Email!",
      html: htmlContent,
      category: "Reset Success Email!",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed send send reset success email!");
  }
};
