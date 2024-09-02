// require('dotenv').config();
// const userDB = require("../model/userModel");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");

// const postUserData = async (req, res) => {
//     try {
//         const { userName, phonNumber, email, location, date } = req.body;

//         // Validate input data
//         if (!userName || !phonNumber || !email || !location || !date) {
//             return res.status(400).json({ Error: "All fields are required." });
//         }

//         const userData = new userDB({ userName, phonNumber, email, location, date });
//         console.log("User Data:", userData);
//         await userData.save();

//         // Send email
//         await send(userName, phonNumber, email, location, date);

//         res.status(201).json({
//             data: userData,
//         });
//     } catch (error) {
//         res.status(500).json({
//             Error: error.message,
//         });
//     }
// };

// const getUserData = async (req, res) => {
//     try {
//         const email = req.params.email;

//         if (!email) {
//             return res.status(400).json({ Error: "Email is required." });
//         }

//         const userData = await userDB.findOne({ email });

//         if (!userData) {
//             return res.status(404).json({ Error: "User not found." });
//         }

//         res.status(200).json({
//             userData,
//         });
//     } catch (error) {
//         res.status(500).json({
//             Error: error.message,
//         });
//     }
// };

// const send = async (userName, phonNumber, email, location, date) => {
//     try {
//         console.log("data", userName, phonNumber, email, location, date);
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "Maa.greamsroad@gmail.com",
//                 pass: "gcwf wols qecg dmss",
//             },
//         });
//         const mailoption = {
//             form:"Maa.greamsroad@gmail.com",
//             to: [email, "Maa.greamsroad@gmail.com"],
//             subject: "Booking the room",
//             text: `Dear ${userName},
//                    Email: ${email}
//                    phonNumber: ${phonNumber}      
//                    Location: ${location}
//                    Date: ${date}`,
//         };
//         await transporter.sendMail(mailoption);
//         console.log("Mail sent successfully");
//     } catch (error) {
//         console.error("Error sending email:", error.message);
//     }
// };

// module.exports = { postUserData, getUserData };



require('dotenv').config();
const userDB = require("../model/userModel");
const nodemailer = require("nodemailer");

// Controller to handle posting user data
const postUserData = async (req, res) => {
    try {
        const { userName, phonNumber, email, location, date, room } = req.body;

        // Validate input data
        if (!userName || !phonNumber || !email || !location || !date || !room) {
            return res.status(400).json({ Error: "All fields are required." });
        }

        // Create new user document
        const userData = new userDB({ userName, phonNumber, email, location, date, room });
        console.log("User Data:", userData);
        await userData.save();

        // Send email
        await send(userName, phonNumber, email, location, date, room);

        res.status(201).json({
            data: userData,
        });
    } catch (error) {
        res.status(500).json({
            Error: error.message,
        });
    }
};

// Controller to handle retrieving user data by email
const getUserData = async (req, res) => {
    try {
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({ Error: "Email is required." });
        }

        const userData = await userDB.findOne({ email });

        if (!userData) {
            return res.status(404).json({ Error: "User not found." });
        }

        res.status(200).json({
            userData,
        });
    } catch (error) {
        res.status(500).json({
            Error: error.message,
        });
    }
};

// Helper function to send an email
const send = async (userName, phonNumber, email, location, date, room) => {
    try {
        console.log("Sending email with data:", userName, phonNumber, email, location, date, room);

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables for sensitive data
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailoption = {
            from: "Maa.greamsroad@gmail.com",
            to: [email, "Maa.greamsroad@gmail.com"],
            subject: "Booking the room",
            text: `Dear ${userName},
                   Email: ${email}
                   Phone Number: ${phonNumber}      
                   Location: ${location}
                   Date: ${date}
                   Rooms: ${room}`,
        };
        await transporter.sendMail(mailoption);
        console.log("Mail sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = { postUserData, getUserData };

