const express = require('express');
const router = express.Router();
const {deleteAllUsers, getAllUsers,getUserByEmail,activateAccount, deactivateParticularUser} = require('../../controllers/adminControllers/adminControllers')


// Admin routes 
router.post('/admin/deleteAllUsers', deleteAllUsers);   
router.get('/admin/getAllUsers', getAllUsers);  
router.get('/users/getByEmail/:email', getUserByEmail); 
router.put('/admin/activateUser/:id', activateAccount);          
router.put('/admin/deactivateUser/:id', deactivateParticularUser);          


module.exports = router; 