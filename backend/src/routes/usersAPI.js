const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");

// Get all Users
router.get("/", async (req, res) => {   
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    }
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO FETCH ALL USERS"});
    }
});

// Get a specific User by username
router.get("/username/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO FETCH USER BY USERNAME"});
    }
})

// Get a specific User by email
router.get("/email/:email", async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO FETCH USER BY EMAIL"});
    }
});

// Create a new User
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO CREATE NEW USER"});
    }
});

// Change a User's first time login status to false
router.patch("/firstLogin/:username", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            { firstTimeLogin: false },
            { new: true }
        );
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO UPDATE FIRST LOGIN STATUS" });
    }
});

// Update a User's userame

// Remove a User

module.exports = router;