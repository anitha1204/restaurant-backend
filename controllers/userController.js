require('dotenv').config();
const userDB = require("../model/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const postUserData = async (req, res) => {
    try {
        const { userName, phonNumber, email, location, date } = req.body;

        // Validate input data
        if (!userName || !phonNumber || !email || !location || !date) {
            return res.status(400).json({ Error: "All fields are required." });
        }

        const userData = new userDB({ userName, phonNumber, email, location, date });
        console.log("User Data:", userData);
        await userData.save();

        // Send email
        await send(userName, phonNumber, email, location, date);

        res.status(201).json({
            data: userData,
        });
    } catch (error) {
        res.status(500).json({
            Error: error.message,
        });
    }
};

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

const send = async (userName, phonNumber, email, location, date) => {
    try {
        console.log("data", userName, phonNumber, email, location, date);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "selvam12042003@gmail.com",
                pass: "jxjj csdq qked wrku",
            },
        });
        const mailoption = {
            form:"selvam12042003@gmail.com",
            to: [email, "maa.greamsroad@gmail.com"],
            subject: "Booking the room",
            text: `Dear ${userName},

            Your Room Booking is successful.
            
            Location: ${location}
            Date: ${date}

            Thank you for your Room booking.`,
        };
        await transporter.sendMail(mailoption);
        console.log("Mail sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = { postUserData, getUserData };
