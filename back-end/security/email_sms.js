const nodemailer = require('nodemailer');
require('dotenv').config()

class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {string} smtpHost - The SMTP host.
     * @param {number} smtpPort - The SMTP port (e.g., 587 for TLS, 465 for SSL).
     * @param {string} smtpUser - The SMTP user (your email).
     * @param {string} smtpPass - The SMTP password.
     */
    constructor(smtpHost, smtpPort, smtpUser, smtpPass) {
        this.transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 587, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });
    }

    /**
     * Verifies the SMTP connection.
     * @returns {Promise<{message: string, status: boolean}>} The result of the verification.
     * @example
     * const result = await emailService.verifyConnection();
     * console.log(result.message); // "Server is ready to take our messages" or error message
     */
    async verifyConnection() {
        try {
            await this.transporter.verify();
            return { message: 'Server is ready to take our messages', status: true };
        } catch (error) {
            return { message: `Error verifying SMTP connection: ${error.message}`, status: false };
        }
    }

    /**
     * Sends a single email.
     * @param {string} to - Recipient's email address.
     * @param {string} subject - The subject of the email.
     * @param {string} text - Plain text content of the email.
     * @param {string|null} [html=null] - Optional HTML content of the email.
     * @returns {Promise<{message: string, status: boolean}>} The result of the email sending.
     * @example
     * const result = await emailService.sendEmail('recipient@example.com', 'Welcome', 'Thank you for joining us!');
     * console.log(result.message); // "Email sent: <messageId>"
     */
    async sendEmail(to, subject, text, html = null) {
        const mailOptions = {
            from: `"From Your salone" <no-reply@yourcompany.com>`, // sender address
            to: to, // recipient's email
            subject: subject, // email subject
            text: text, // plain text message
            html: html || text // HTML message (optional), fallback to plain text
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { message: `Email sent: ${info.messageId}`, status: true };
        } catch (error) {
            return { message: `Error sending email: ${error.message}`, status: false };
        }
    }

    /**
     * Sends bulk emails to multiple recipients.
     * @param {string[]} recipients - Array of recipient email addresses.
     * @param {string} subject - The subject of the email.
     * @param {string} text - Plain text content of the email.
     * @param {string|null} [html=null] - Optional HTML content of the email.
     * @returns {Promise<Array<{message: string, status: boolean}>>} The results for each email sent.
     * @example
     * const results = await emailService.sendBulkEmails(['user1@example.com', 'user2@example.com'], 'Notification', 'This is a test.');
     * console.log(results); // Array of email sending results
     */
    async sendBulkEmails(recipients, subject, text, html = null) {
        const results = [];
        for (const recipient of recipients) {
            const result = await this.sendEmail(recipient, subject, text, html);
            results.push(result);
        }
        return results;
    }

    /**
     * Sends an email with attachments.
     * @param {string} to - Recipient's email address.
     * @param {string} subject - The subject of the email.
     * @param {string} text - Plain text content of the email.
     * @param {Array<{filename: string, path: string}>} attachments - Array of attachment objects.
     * @returns {Promise<{message: string, status: boolean}>} The result of sending the email with attachments.
     * @example
     * const attachments = [{ filename: 'file.txt', path: './file.txt' }];
     * const result = await emailService.sendEmailWithAttachment('recipient@example.com', 'File Attached', 'Please see the attachment.', attachments);
     * console.log(result.message); // "Email sent with attachment: <messageId>"
     */
    async sendEmailWithAttachment(to, subject, text, attachments) {
        const mailOptions = {
            from: `"Your Company" <no-reply@yourcompany.com>`, // sender address
            to: to, // recipient's email
            subject: subject, // email subject
            text: text, // plain text message
            attachments: attachments // array of attachments
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { message: `Email sent with attachment: ${info.messageId}`, status: true };
        } catch (error) {
            return { message: `Error sending email with attachment: ${error.message}`, status: false };
        }
    }

    /**
     * Validates an email address format.
     * @param {string} email - The email address to validate.
     * @returns {string} A message indicating whether the email is valid or invalid.
     * @example
     * const result = emailService.validateEmail('test@example.com');
     * console.log(result); // "Valid email address" or "Invalid email address"
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? 'Valid email address' : 'Invalid email address';
    }
}

module.exports = EmailService;




