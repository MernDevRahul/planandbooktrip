const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken')

const {registerUser,
       login,
       verifyAccount,
       resendVerifyAccountMail,
       passwordResetMail,
       resendPasswordResetMail,
       logout,
       updatePassword,
       isAuthenticated,
       adminLogin,
       editUser,
       registerAdmin,
       deleteUser
      }=require('../../controllers/auth/emailauth');

 /*------------------------register routes--------------------------------*/
//registering user
router.route('/auth/register')
.post(registerUser);
// register admin
router.route('/auth/registerAdmin')
.post(registerAdmin);


// ----------------------Verify Token-------------------------
router.route('/verify-account')
.post(verifyAccount)

// -----------resnd Verification-token-----------
router.route('/resend-registration-mail')
.post(resendVerifyAccountMail)




/*------------------------login routes--------------------------------*/
//user login route
router.route('/auth/login')
.post(login);

// superAdmin and admin Routes
router.route('/auth/adminLogin')
.post(adminLogin);

// editRole
router.route('/auth/admin/updateUser')
.put(editUser);
//delete user
router.route('/auth/deleteUser')
.delete(deleteUser);

// ============isAuthenticated=============

router.route('/auth/isAuthenticated')
.post(isAuthenticated)

//logout
router.route('/auth/logout')
.post(logout)
 

// ====================Password Reset Mail======================
router.route('/auth/password-reset')
.post(passwordResetMail);
router.route('/auth/resend-password-reset-mail')
.post(resendPasswordResetMail)
router.route('/auth/update-password')
.post(updatePassword);

module.exports=router;
