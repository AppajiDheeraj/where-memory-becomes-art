import VerificationEmail from "./templates/VerificationEmail";
import MagicLinkEmail from "./templates/MagicLinkEmail";
import WelcomeEmail from "./templates/WelcomeEmail";
import LoginAlertEmail from "./templates/LoginAlertEmail";

export const EmailTemplates = {
  VerificationEmail,
  MagicLinkEmail,
  WelcomeEmail,
  LoginAlertEmail,
};

export type EmailTemplatesType = typeof EmailTemplates;
export default EmailTemplates;
