const nodemailer = require('nodemailer');
// Create a transporter object using SMTP transport (Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Controller function to send email
const sendEmail = (req, res) => {
  const { selectedCars, pickupValue, destinationValue, datetime12h, passengerCount, additionalRequests, name, email, phone } = req.body;
  const carDetails = selectedCars.map(car => `${car.company_name} (${car.car_name})`).join(', ');

  // Define the mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email (same as in the transporter)
    to: process.env.TO_EMAIL,  // Recipient email (you can customize this)
    subject: 'Form Submission - New Request',
    text: `
      Car Details: ${carDetails}
      Pickup Location: ${pickupValue}
      Destination Location: ${destinationValue}
      Date & Time: ${datetime12h}
      Passengers : ${passengerCount}
      Additional Requests: ${additionalRequests}
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    return res.status(200).send('Email sent successfully');
  });
};

module.exports = { sendEmail };
