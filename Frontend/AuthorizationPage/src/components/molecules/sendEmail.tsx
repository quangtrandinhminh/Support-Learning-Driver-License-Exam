import nodemailer from "nodemailer";

// Cấu hình máy chủ email SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail", // Hoặc sử dụng dịch vụ email khác (Yahoo, Outlook, etc.)
  auth: {
    user: "your_email@gmail.com", // Email của bạn
    pass: "your_password", // Mật khẩu email của bạn
  },
});

// Hàm gửi email với mã xác nhận
const sendEmail = (toEmail: string, confirmationCode: string): Promise<void> => {
  const mailOptions = {
    from: "your_email@gmail.com", // Email nguồn
    to: toEmail, // Email đích
    subject: "Confirmation Code", // Tiêu đề email
    text: `Your confirmation code is: ${confirmationCode}`, // Nội dung email
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(new Error("Failed to send email"));
      } else {
        console.log("Email sent: " + info.response);
        resolve();
      }
    });
  });
};

export default sendEmail;
