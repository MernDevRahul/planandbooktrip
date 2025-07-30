const passport = require("passport");
const User = require("../../modal/user/user"); // Import User model
const BASE_URL = process.env.BASE_URL; // Google Auth Redirect
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Google Auth Callback
const googleCallback = passport.authenticate("google", {
  failureRedirect: `${BASE_URL}/login`,});

// Handle Google Auth Success & Store User in Database
const handleGoogleCallback = async (req, res) => {

  if (!req.user) {
 
    return res.redirect(`${BASE_URL}/login`,); // Redirect on failure
  }

  try {
    // Extract user data from Google profile
    const { id, displayName, emails, photos } = req.user;
  
    // Check if user already exists in database
    let user = await User.findOne({ googleId: id });

    if (!user) {
      // Create a new user in database
      user = new User({
        firstName: displayName.split(" ")[0], // Extract first name
        lastName: displayName.split(" ").slice(1).join(" ") || "", // Extract last name
        email: emails[0].value,
        userName: displayName, // Extract username from email
        googleId: id,
        profilePicture: photos[0].value, // Store Google profile picture
      });

      await user.save(); // Save to database
    }

    // Store user in session
    req.session.user = user;

    res.redirect(`${BASE_URL}`); // Redirect to frontend
  } catch (error) {
    // console.error("Google Auth Error:", error);
    res.redirect(`${BASE_URL}/login`); // Redirect on error
  }
};

// Logout User & Destroy Session
const logoutUser = (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
  
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            // console.log("Error destroying session:", err);
            return res.status(500).json({ error: "Session destruction failed" });
          }
          res.clearCookie("connect.sid"); // Clear session cookie
          return res.redirect(`${BASE_URL}`);
        });
      } else {
        return res.redirect(`${BASE_URL}`);
      }
    });
  };

module.exports = { googleAuth, googleCallback, handleGoogleCallback, logoutUser };
