const {Router} = require('express');
const router = Router();
const User_model = require('../Models/User.model.js')
const bcrypt = require('bcrypt')


router.get("/user",async(req, res) => {
    try {
        const user_data = await User_model.find();
        if (!user_data) {
            return res.status(404).json({ "message": "No user found" });
        }
        res.status(200).json({ "user_data": user_data, "message": "Users found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Could not get users" });
        
    }
    
})

router.post("/user_register", async (req, res) => {
    try {
        console.log(req.body);
        // console.log(req);
        if (!req.body || !req.body.password) {
            return res.status(400).json({ "message": "Fill all fields" });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
        const createUser = await User_model.create(req.body);
        res.status(200).json({ "user_data": createUser, "message": "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Could not create user" });
    }
});


router.get("/user/:id", async (req, res) => {
    try {
        const user = await User_model.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.status(200).json({ "user_data": user ,"message": "User found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Could not get user" });
    }
})

router.put("/user/:id", async (req, res) => {
    try {
        const user = await User_model.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }
        const updateUser = await User_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ "user_data": updateUser, "message": "User updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Could not update user" });
    }
})

router.delete("/user/:id", async (req, res) => {
    try {
        const user = await User_model.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }else{
            const deleteUser = await User_model.findByIdAndDelete(req.params.id);
            res.status(200).json({ "message": "User deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Could not delete user" });
        
    }
})


module.exports = router; 


// {
//     "name": "John Doe",
//     "Date_of_birth": "1990-01-01T00:00:00.000Z",
//     "email": "johndoe@example.com",
//     "phone": 1234567890,
//     "password": "securepassword123",
//     "profile_picture": "http://example.com/profile.jpg",
//     "created_at": "2023-10-01T00:00:00.000Z",
//     "updated_at": "2023-10-01T00:00:00.000Z",
//     "address": "123 Main St",
//     "city": "Anytown",
//     "country": "USA",
//     "zip_code": 12345,
//     "phone_country_code": 1
// }