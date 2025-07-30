// Import required modules
const generateToken = require("../../config/token/generateToken");
const User = require("../../modal/user/user");
const passport = require("passport");
const expressAsyncHandler = require("express-async-handler");
const registrationMailOptions = require("../../config/mailConfigration/registrationMailOption");
const sendMailController = require("../../config/mailConfigration/sendMailConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordResetMailOptions = require("../../config/mailConfigration/passwordResetMail");

// Controller to register user
const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if the user already exists
    const userName = `${firstName} ${lastName}`
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(200)
        .json({ success: false, error: true, message: "Email already exists" });
    }

    // Create new user
    const user = await User.create({
      userName, // Corrected field name
      email,
      password,
      firstName,
      lastName,
    });

    // Generate token
    const token = await generateToken(user._id);
    // Get the current time
    const currentTime = new Date();
    // Calculate expiration time: 10 minutes from now
    const expirationTime = new Date(currentTime.getTime() + 10 * 60 * 1000);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        accountVerificationToken: token,
        accountVerificationTokenExpiry: expirationTime,
      },
      {
        new: true, // This option returns the updated document
      }
    );

    const BASE_URL = `${process.env.BASE_URL}/verify-account/${token}`;
    // Set up email content
    const emailReceiver = email;
    const emailSender = "contact@planandbooktrip.com";
    const emailSubject = "Email Verification";
    const emailHeader = "Plan And Booktrip";
    const displayName = `${userName}`;
    const websiteName = "Plan and Book Trip";
    const greetMessage = `  Hey ${displayName} We're thrilled to
                                            have you on board at
                                            <strong> ${websiteName}</strong> To
                                            finalize your registration, please click
                                            the link below to verify your email
                                            address:`;
    const companyMessage = `At ${websiteName}, every journey tells a story. We are dedicated to offering exceptional tour and travel packages that blend adventure, comfort, and unforgettable experiences. Whether you're seeking breathtaking destinations, personalized itineraries, or unique travel experiences, we provide tailored solutions to bring your dream trip to life with expert planning and seamless execution.<ul>`;

    const supportEmail = "contact@planandbooktrip.com";
    const supportPhone = "1234567890";
    const supportAddress = "1234,Dwarka Mor, Delhi,India";
    const socilaLinkLinkedin = "https://www.linkedin.com/";
    const socialLinkFacebook = "https://www.facebook.com/";
    const socialLinkTwitter = "https://twitter.com/";
    const socialLinkInstagram = "https://www.instagram.com/";
    const socialLinkYoutube = "https://www.youtube.com/";
    const logoImage =
      "https://res.cloudinary.com/dyf4m9od7/image/upload/v1739945332/s12vlendf2xokigwma5o.png";
    const registrationImage =
      "https://ci3.googleusercontent.com/meips/ADKq_NZuv4HNVAbZJ1KMZJ30rA2DZmtveJH7EhtpIPauj79WxFi4tbKM86owne9Srk6CBDMChyQrSG9tAhRHF6u1C_785qJLa3JqmaBT3E4k1hwFNidY4bgs07Lj_HPP-EPy=s0-d-e1-ft#https://modulescomposer.s3.us-east-2.amazonaws.com/purple/img_intro_1.png";
    // Send email
    const mailOptions = registrationMailOptions(
      emailReceiver,
      emailSender,
      emailSubject,
      emailHeader,
      greetMessage,
      companyMessage,
      displayName,
      logoImage,
      registrationImage,
      websiteName,
      BASE_URL,
      supportEmail,
      supportPhone,
      supportAddress,
      socilaLinkLinkedin,
      socialLinkFacebook,
      socialLinkTwitter,
      socialLinkInstagram,
      socialLinkYoutube
    );
    await sendMailController(mailOptions);

    // Respond with success message
    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email for verification instructions.",
      error: false,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ success: false, message: error.message, error: true });
  }
});
// Controller Sfor verify account
const verifyAccount = expressAsyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Corrected token extraction
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const decodedUser = await User.findById(decoded.id).lean();
    // console.log(decodedUser)
    // Find the user with the given token
    const user = await User.findOne({
      accountVerificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid or expired token",
      });
    }

    // Update user status to verified
    user.isAccountVerified = true;
    user.accountVerificationToken = undefined; // Remove the token
    user.accountVerificationTokenExpiry = undefined; // Remove the expiration time
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account successfully verified",
      error: false,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
});

const resendVerifyAccountMail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Email is required." });
  }

  try {
    const date = new Date();
    const expirationDate = new Date(date.getTime() + 10 * 60 * 1000); // 10 minutes from now

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "User not found." });
    }

    // Generate a token
    const token = await generateToken(user._id);

    // Update the user document
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        accountVerificationToken: token,
        accountVerificationTokenExpiry: expirationDate,
        isAccountVerified: false,
      },
      { new: true } // Return the updated user document
    );

    const BASE_URL = `${process.env.BASE_URL}/verify-account/${token}`;
    const userName = `${user.firstName} ${user.lastName}`;
    // Set up email content
    const emailReceiver = email;
    const emailSender = "contact@planandbooktrip.com";
    const emailSubject = "Email Verification";
    const emailHeader = "Plan And Booktrip";
    const displayName = `${userName}`;
    const websiteName = "Plan and Book Trip";
    const greetMessage = `Hey ${displayName}, We're thrilled to have you on board at <strong>${websiteName}</strong>. To finalize your registration, please click the link below to verify your email address:`;
    const companyMessage = `At ${websiteName}, every journey tells a story. We are dedicated to offering exceptional tour and travel packages that blend adventure, comfort, and unforgettable experiences. Whether you're seeking breathtaking destinations, personalized itineraries, or unique travel experiences, we provide tailored solutions to bring your dream trip to life with expert planning and seamless execution.`;

    const supportEmail = "contact@planandbooktrip.com";
    const supportPhone = "1234567890";
    const supportAddress = "1234, Dwarka Mor, Delhi, India";
    const socialLinkLinkedin = "https://www.linkedin.com/";
    const socialLinkFacebook = "https://www.facebook.com/";
    const socialLinkTwitter = "https://twitter.com/";
    const socialLinkInstagram = "https://www.instagram.com/";
    const socialLinkYoutube = "https://www.youtube.com/";
    const logoImage = "https://res.cloudinary.com/dyf4m9od7/image/upload/v1739945332/s12vlendf2xokigwma5o.png";
    const registrationImage = "https://ci3.googleusercontent.com/meips/ADKq_NZuv4HNVAbZJ1KMZJ30rA2DZmtveJH7EhtpIPauj79WxFi4tbKM86owne9Srk6CBDMChyQrSG9tAhRHF6u1C_785qJLa3JqmaBT3E4k1hwFNidY4bgs07Lj_HPP-EPy=s0-d-e1-ft#https://modulescomposer.s3.us-east-2.amazonaws.com/purple/img_intro_1.png";
    // Send email
    const mailOptions = registrationMailOptions(
      emailReceiver,
      emailSender,
      emailSubject,
      emailHeader,
      greetMessage,
      companyMessage,
      displayName,
      logoImage,
      registrationImage,
      websiteName,
      BASE_URL,
      supportEmail,
      supportPhone,
      supportAddress,
      socialLinkLinkedin,
      socialLinkFacebook,
      socialLinkTwitter,
      socialLinkInstagram,
      socialLinkYoutube
    );
    await sendMailController(mailOptions);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully.",
    });
  } catch (error) {
    // Handle unexpected errors
    return res
      .status(500)
      .json({ success: false, error: true, message: "Internal server error." });
  }
});

//-------------------------------login ctrl--------------------------------------------------
//controller to login user
// Login route
const login = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    // Find user by email
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    // Verify password
    if (!(await userFound.isPasswordMatched(password))) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const generatenewToken = generateToken(userFound._id);

    // Set session user data BEFORE saving the session
    req.session.user = {
      id: userFound._id,
      email: userFound.email,
      profilePhoto: userFound.profilePhoto,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      token: generatenewToken,
    };

    // Save session before responding
    req.session.save((err) => {
      if (err) {
        // console.error("Session save error:", err);
        return res.status(500).json({ message: "Session creation failed" });
      }

      // console.log("Session after login:", req.session); // Debugging

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: req.session.user, // Return session user data
        token: generatenewToken,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// controller to reset Password
const passwordResetMail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Email is required." });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "User not found." });
    }

    // Generate a token
    const token = generateToken(user._id);
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Update the user document
    await User.findOneAndUpdate(
      { email: email },
      {
        forgotPasswordVerificationToken: token,
        forgotPasswordVerificationTokenExpires: expirationTime,
      },
      { new: true } // Return the updated user document
    );

    const BASE_URL = `${process.env.BASE_URL}/reset-password/${token}`;
    const userName = `${user.firstName} ${user.lastName}`;
    // Set up email content
    const emailReceiver = email;
    const emailSender = "contact@planandbooktrip.com";
    const emailSubject = "Password Reset";
    const emailHeader = "Plan And Booktrip";
    const displayName = `${userName}`;
    const websiteName = "Plan and Book Trip";
    const greetMessage = `Hey ${displayName}, We received a request to reset your password for <strong>${websiteName}</strong>. Please click the link below to reset your password:`;
    const companyMessage = `At ${websiteName}, every journey tells a story. We are dedicated to offering exceptional tour and travel packages that blend adventure, comfort, and unforgettable experiences. Whether you're seeking breathtaking destinations, personalized itineraries, or unique travel experiences, we provide tailored solutions to bring your dream trip to life with expert planning and seamless execution.`;

    const supportEmail = "contact@planandbooktrip.com";
    const supportPhone = "1234567890";
    const supportAddress = "1234, Dwarka Mor, Delhi, India";
    const socialLinkLinkedin = "https://www.linkedin.com/";
    const socialLinkFacebook = "https://www.facebook.com/";
    const socialLinkTwitter = "https://twitter.com/";
    const socialLinkInstagram = "https://www.instagram.com/";
    const socialLinkYoutube = "https://www.youtube.com/";
    const logoImage = "https://res.cloudinary.com/dyf4m9od7/image/upload/v1739945332/s12vlendf2xokigwma5o.png";
    const registrationImage = "https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?size=626&ext=jpg&ga=GA1.1.2048544296.1723098509&semt=ais_hybrid";
    // Send email
    const mailOptions = passwordResetMailOptions(
      emailReceiver,
      emailSender,
      emailSubject,
      emailHeader,
      greetMessage,
      companyMessage,
      displayName,
      logoImage,
      registrationImage,
      websiteName,
      BASE_URL,
      supportEmail,
      supportPhone,
      supportAddress,
      socialLinkLinkedin,
      socialLinkFacebook,
      socialLinkTwitter,
      socialLinkInstagram,
      socialLinkYoutube
    );
    await sendMailController(mailOptions);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    // Handle unexpected errors
    return res
      .status(500)
      .json({ success: false, error: true, message: "Internal server error." });
  }
});

const resendPasswordResetMail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Email is required." });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "User not found." });
    }

    // Generate a token
    const token = generateToken(user._id);
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Update the user document
    await User.findOneAndUpdate(
      { email: email },
      {
        forgotPasswordVerificationToken: token,
        forgotPasswordVerificationTokenExpires: expirationTime,
      },
      { new: true } // Return the updated user document
    );

    const BASE_URL = `${process.env.BASE_URL}/reset-password/${token}`;
    const userName = `${user.firstName} ${user.lastName}`;
    // Set up email content
    const emailReceiver = email;
    const emailSender = "contact@planandbooktrip.com";
    const emailSubject = "Password Reset";
    const emailHeader = "Plan And Booktrip";
    const displayName = `${userName}`;
    const websiteName = "Plan and Book Trip";
    const greetMessage = `Hey ${displayName}, We received a request to reset your password for <strong>${websiteName}</strong>. Please click the link below to reset your password:`;
    const companyMessage = `At ${websiteName}, every journey tells a story. We are dedicated to offering exceptional tour and travel packages that blend adventure, comfort, and unforgettable experiences. Whether you're seeking breathtaking destinations, personalized itineraries, or unique travel experiences, we provide tailored solutions to bring your dream trip to life with expert planning and seamless execution.`;

    const supportEmail = "contact@planandbooktrip.com";
    const supportPhone = "1234567890";
    const supportAddress = "1234, Dwarka Mor, Delhi, India";
    const socialLinkLinkedin = "https://www.linkedin.com/";
    const socialLinkFacebook = "https://www.facebook.com/";
    const socialLinkTwitter = "https://twitter.com/";
    const socialLinkInstagram = "https://www.instagram.com/";
    const socialLinkYoutube = "https://www.youtube.com/";
    const logoImage = "https://res.cloudinary.com/dyf4m9od7/image/upload/v1739945332/s12vlendf2xokigwma5o.png";
    const registrationImage = "https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?size=626&ext=jpg&ga=GA1.1.2048544296.1723098509&semt=ais_hybrid";
    // Send email
    const mailOptions = passwordResetMailOptions(
      emailReceiver,
      emailSender,
      emailSubject,
      emailHeader,
      greetMessage,
      companyMessage,
      displayName,
      logoImage,
      registrationImage,
      websiteName,
      BASE_URL,
      supportEmail,
      supportPhone,
      supportAddress,
      socialLinkLinkedin,
      socialLinkFacebook,
      socialLinkTwitter,
      socialLinkInstagram,
      socialLinkYoutube
    );
    await sendMailController(mailOptions);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    // Handle unexpected errors
    return res
      .status(500)
      .json({ success: false, error: true, message: "Internal server error." });
  }
});

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({
        success: "false",
        error: "true",
        message: "Authorization header missing",
      });
    }

    // Extract the token from the Authorization header
    const authToken = authHeader.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({
        message: "Authentication token missing",
        success: "false",
        error: "true",
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    const userId = decoded.id;

    const authenticUser = await User.findById(userId);
    // console.log(authenticUser);
    const user = {
      id: authenticUser._id,
      email: authenticUser.email,
      firstName: authenticUser.firstName,
      profilePhoto: authenticUser.profilePhoto,
      lastName: authenticUser.lastName,
      accountStatus: authenticUser?.accountStatus,
    };

    return res
      .status(200)
      .json({ success: "true", message: "session already exists", user: user });
  } catch (error) {
    // console.error("Error during authentication:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
 
  try {
    const newPassword = req.body.password;
    const authHeader = req.headers["authorization"];
    // console.log(newPassword)
    // Check if the Authorization header is present
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization header is missing" });
    }

    // Extract the token from the Authorization hea
    // der
    const token = authHeader.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find the user by ID
    const user = await User.findById(decoded.id);

    // If user is not found, return 404
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const tokenValidityPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
    const tokenExpiryTime =
      new Date(user.passwordResetTokenExpiry).getTime() + tokenValidityPeriod;

    if (tokenExpiryTime < Date.now()) {
      return res
        .status(401)
        .json({ success: false, message: "Token has expired" });
    }

    // Validate the new password after hashing
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    // Update the user's password in the database
    user.password = newPassword;

    await user.save();
    await User.findByIdAndUpdate(user._id, {
      passwordResetTokenExpires: "",
      forgotPasswordVerificationToken: "",
    });
    // Return success message
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // Handle any errors and return 500 status with error message
    // console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// logout controller
const logout = (req, res) => {
  // Destroy the session
  // console.log(req.session.user);
  // console.log(req.session);

  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong, try again!" });
    }

    // Clear the session co okie from the client
    res.clearCookie("connect.sid"); // Default cookie name used by express-session

    // Send response confirming logout
    res.status(200).json({ message: "Logout successful" });
  });
};

// ======================Admin Routes==================

const registerAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(201)
        .json({ success: false, error: true, message: "Email already exists" });
    }

    // Create new user
    const user = await User.create({

      firstName,
      lastName,
      userName: `${firstName} ${lastName}`, // Corrected field name
      email,
      role,
      password,
    });

    // console.log(user);

    // Generate token
    const token = await generateToken(user._id);
    // Get the current time
    const currentTime = new Date();
    // Calculate expiration time: 10 minutes from now
    const expirationTime = new Date(currentTime.getTime() + 10 * 60 * 1000);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        accountVerificationToken: token,
        accountVerificationTokenExpiry: expirationTime,
      },
      {
        new: true, // This option returns the updated document
      }
    );

    const BASE_URL = `${process.env.BASE_URL}/verify-account/${token}`;
    // Set up email content
    const userName = `${user.firstName} ${user.lastName}`;
    const emailReceiver = email;
    const emailSender = "contact@planandbooktrip.com";
    const emailSubject = "Email Verification";
    const emailHeader = "Plan And Booktrip";
    const displayName = `${userName}`;
    const websiteName = "Plan and Book Trip";
    const greetMessage = `  Hey ${displayName} We're thrilled to
                                            have you on board at
                                            <strong> ${websiteName}</strong> To
                                            finalize your registration, please click
                                            the link below to verify your email
                                            address:`;
    const companyMessage = `At ${websiteName}, every journey tells a story. We are dedicated to offering exceptional tour and travel packages that blend adventure, comfort, and unforgettable experiences. Whether you're seeking breathtaking destinations, personalized itineraries, or unique travel experiences, we provide tailored solutions to bring your dream trip to life with expert planning and seamless execution.<ul>`;

    const supportEmail = "contact@planandbooktrip.com";
    const supportPhone = "1234567890";
    const supportAddress = "1234,Dwarka Mor, Delhi,India";
    const socilaLinkLinkedin = "https://www.linkedin.com/";
    const socialLinkFacebook = "https://www.facebook.com/";
    const socialLinkTwitter = "https://twitter.com/";
    const socialLinkInstagram = "https://www.instagram.com/";
    const socialLinkYoutube = "https://www.youtube.com/";
    const logoImage =
      "https://res.cloudinary.com/dyf4m9od7/image/upload/v1739945332/s12vlendf2xokigwma5o.png";
    const registrationImage =
      "https://ci3.googleusercontent.com/meips/ADKq_NZuv4HNVAbZJ1KMZJ30rA2DZmtveJH7EhtpIPauj79WxFi4tbKM86owne9Srk6CBDMChyQrSG9tAhRHF6u1C_785qJLa3JqmaBT3E4k1hwFNidY4bgs07Lj_HPP-EPy=s0-d-e1-ft#https://modulescomposer.s3.us-east-2.amazonaws.com/purple/img_intro_1.png";
    // Send email
    const mailOptions = registrationMailOptions(
      emailReceiver,
      emailSender,
      emailSubject,
      emailHeader,
      greetMessage,
      companyMessage,
      displayName,
      logoImage,
      registrationImage,
      websiteName,
      BASE_URL,
      supportEmail,
      supportPhone,
      supportAddress,
      socilaLinkLinkedin,
      socialLinkFacebook,
      socialLinkTwitter,
      socialLinkInstagram,
      socialLinkYoutube
    );
    await sendMailController(mailOptions);

    // Respond with success message
    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email for verification instructions.",
      error: false,
    });
  } catch (error) {
    // Handle errors
    // console.log(error)
    res
      .status(500)
      .json({ success: false, message: error.message, error: true });
  }
});

const adminLogin = expressAsyncHandler(async (req, res) => {
  // console.log("njdfbjf")
  try {
    const { email, password } = req.body;

    // Find user by email
    const userFound = await User.findOne({ email });

    // Check if user exists
    if (!userFound) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    // Check if user has admin or super-admin role
    const userRole = (userFound ?.accountStatus === "active") && (userFound.role === "admin" || userFound.role === "super-admin");
    if (!userRole) {
      return res.status(401).json({ message: "Access Denied", error: true, success: false });
    }

    // Verify password
    if (!(await userFound.isPasswordMatched(password))) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const generatenewToken = generateToken(userFound._id);
    const loginTokenExpiryTime = new Date(Date.now() + 10 * 60 * 1000).getTime();
 
const updatedUserData =await User.findByIdAndUpdate(userFound._id, {
  loginToken: generatenewToken, 
  loginTokenExpiryTime: loginTokenExpiryTime,
});

    // Set session user data BEFORE saving the session
    req.session.user = {
      id: updatedUserData._id,
      email: updatedUserData.email,
      profilePhoto: updatedUserData.profilePicture,
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName,
      role: updatedUserData.role,
      accountStatus:updatedUserData?.accountStatus,
      token: updatedUserData.loginToken,
      loginTokenExpiryTime:updatedUserData.loginTokenExpiryTime
    };

    // Save session before responding
    req.session.save((err) => {
      if (err) {
        // console.error("Session save error:", err);
        return res.status(500).json({ message: "Session creation failed" });
      }

    

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        user: req.session.user, // Return session user data
        token: generatenewToken,
      });

    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const editUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id, role, firstName, lastName, password } = req.body;
// console.log(req.body)
    // Check if ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong !" });
    }

    // Create an object with only the fields provided
    let updateData = {};
    if (role) updateData.role = role;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
if(password) updateData.password = password;
    // Hash password if provided
   

    // Find user by ID and update with provided data
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensure schema validation is applied
    });

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await updatedUser.save(); // Save the updated user
    // Return success response
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, message: error.message });
  }
});


const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req?.body;
  // console.log(id);
  const user = await User.deleteOne({ _id: id });
  res.status(200).json({ success: true, message: "user deleted successfully" });
});

module.exports = {
  registerUser,
  verifyAccount,
  resendVerifyAccountMail,
  updatePassword,
  login,
  adminLogin,
  passwordResetMail,
  logout,
  deleteUser,
  editUser,
  isAuthenticated,
  registerAdmin,
  resendPasswordResetMail
};

