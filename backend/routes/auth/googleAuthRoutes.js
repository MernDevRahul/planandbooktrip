const express = require("express");
const {
  googleAuth,
  googleCallback,
  handleGoogleCallback,
  logoutUser,
} = require("../../controllers/auth/googleAuth");

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback, handleGoogleCallback);
router.get("/logout", logoutUser);

module.exports = router;
