// Import Modules
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
        res.status(500).json({ error: "Failed to fetch all users"});
    }
});

// Get a specific User by username
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user by username"});
    }
})

// Get a specific User by email
router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user by email"});
    }
});

// Create a new User
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create new user"});
    }
}) 

// Update a User's userame

// Remove a User
