// // Example usage of the EmailService class with the Static class
// (async () => {
//     try {
//         // Verify SMTP connection
//         const Static = require('../static');
//         const emailService = Static.email; // Get the EmailService instance
//         const verifyResult = await emailService.verifyConnection();
//         console.log(verifyResult); // Returns the verification result

//         // Send a single email
//         const recipientEmail = 'kalebademkisho@gmail.com';
//         if (emailService.validateEmail(recipientEmail) === 'Valid email address') {
//             const sendEmailResult = await emailService.sendEmail(
//                 recipientEmail,
//                 'Welcome!',
//                 'Thank you for signing up for our service!'
//             );
//             console.log(sendEmailResult); // Returns the result of sending the email
//         } else {
//             console.error('Invalid email address:', recipientEmail);
//         }

//         // Send bulk emails
//         const recipients = ['recipient1@example.com', 'recipient2@example.com'];
//         const bulkEmailResults = await emailService.sendBulkEmails(
//             recipients,
//             'Important Notification',
//             'This is a bulk notification email.'
//         );
//         console.log(bulkEmailResults); // Returns an array of results for each recipient

//         // Send email with attachment
//         const attachments = [
//             {
//                 filename: 'attachment.txt',
//                 path: './files/attachment.txt' // Path to the attachment file
//             }
//         ];
//         const sendAttachmentResult = await emailService.sendEmailWithAttachment(
//             recipientEmail,
//             'Document Attached',
//             'Please find the attached document.',
//             attachments
//         );
//         console.log(sendAttachmentResult); // Returns the result of sending email with attachment
//     } catch (error) {
//         console.error('Error in email operations:', error);
//     }
// })();