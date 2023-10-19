const mongoose = require("mongoose");

//creating schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase:true,
    unique:true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[!@#$%^&*])/.test(v) && v.length >= 8;
      },
      message:
        "Password must be at least 8 characters long and contain at least one special character (!@#$%^&*)",
    },
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
