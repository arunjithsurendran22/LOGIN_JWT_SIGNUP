const User = require("../models/User");


//GET METHOD

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured" });
  }
};

//POST METHOD

const createUser = async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured" });
  }
};

//UPDATE METHOD

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured" });
  }
};

//DELETE METHOD
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured" });
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
