require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const salt = 10;

const JWT_SECRET = process.env.JWT_SECRET;

//verify JWT TOKEN
const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    return verify.type === "user";
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return false;
  }
};

//GET HOME PAGE
//there is cookie need to rnder home otherwise render to login page
const home = (req, res) => {
  const { token } = req.cookies;
  if (verifyToken(token)) {
    return res.render("home");
  } else {
    res.redirect("/login");
  }
};

//GET PROFILE FOR UPATE USERNAME
const profile = (req, res) => {
  const { token } = req.cookies;
  if (verifyToken(token)) {
    res.render("profile");
  } else {
    res.redirect("/login");
  }
};

//POST UPDATED USERNAME AND PASSWORD
const updateProfile = async (req, res) => {
  const { token } = req.cookies;
  if (verifyToken(token)) {
    const { email, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, salt);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      await User.findByIdAndUpdate(id, { email, password });
      // Clear the JWT token cookie for logout
      res.cookie("token", "", { expires: new Date(0), httpOnly: true });
      res.redirect("/login");
    } catch (error) {
      console.log(JSON.stringify(error));
      res.status(500).send("Internal server error");
    }
  } else {
    res.redirect("/login");
  }
}

//LOGOUT
const logout = (req, res) => {
  // Clear the JWT token cookie by setting its expiration to a past date
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.redirect("/login"); // Redirect the user to the login page after logout
};

const loginGet =(req,res)=>{
  res.render('login')
}
const signupGet=(req,res)=>{
  res.render('signup')
}
const frontPage=(req,res)=>{
  res.render('front-page')
}

//TODO GET
const todo=async(req,res)=>{
  try{
    const todos=await User.find()
    res.json(todos)
  }catch(error){
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
}




module.exports = {home,profile,updateProfile,loginGet,signupGet,logout,frontPage}
