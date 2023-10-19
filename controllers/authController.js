const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const salt = 10;

const JWT_SECRET = process.env.JWT_SECRET;

// Function to verify user login
const verifyUserLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return { status: "error", error: "User not found" };
    }

    if (await bcrypt.compare(password, user.password)) {
      // Create a JWT token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.email,
          type: "user",
        },
        JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return {
        status: "ok",
        data: token,
      };
    }

    return {
      status: "error",
      error: "Invalid password",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "Timed out",
    };
  }
};

// POST: User Sign Up
const signup = async (req, res) => {
  const { email, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, salt);

  try {
    const response = await User.create({
      email,
      password,
    });
    console.log(response);
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", error: "Email already exists" });
    }
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// POST: User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verify user login using the function
  const response = await verifyUserLogin(email, password);

  if (response.status === "ok") {
    // Store the JWT token as a cookie in the browser
    res.cookie("token", response.data, {
      maxAge: 2 * 60 * 60 * 1000, // Max age: 2 hours
      httpOnly: true,
    });

    res.redirect("/");
  } else {
    res.status(401).json(response);
  }
};


module.exports = { signup, login  };
