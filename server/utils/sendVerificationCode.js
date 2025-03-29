import { generateverificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(sendVerificationCode, email, res){
    try {
        const message = generateverificationOtpEmailTemplate(verificationCode);
        sendEmail({
            email,
            subject:"Verification Code (Bookworm Library Management System)",
            message,
        });
        return res.status(200).json({
            success: false,
            message: "Verification code sent successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Verification code failed to send.",
        });
    }
};