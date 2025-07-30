const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Importing crypto for generating tokens
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String,  },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: false }, // Optional for Google login

    // Google Authentication Fields
    googleId: { type: String, unique: true, sparse: true }, // Google ID (Unique but optional)
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png",
    }, // URL for profile picture

    // Address (Optional)
    address: { 
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },

    // Account Details
    role: { type: String, enum: ["user", "admin", "super-admin"], default: "user" }, // Role Management
    accountStatus: { type: String, enum: ["active", "banned"], default: "active" }, // Account Status
    accountVerificationToken: { type: String }, // Account Verification Token
    isAccountVerified: { type: Boolean, default: false }, // Account Verification Status
    accountVerificationTokenExpiry: { type: Date }, // Account Verification Token Expiry

    
    // Password Reset Fields
    passwordResetToken: { type: String }, // Password Reset Token (Optional)
    passwordResetTokenExpiry: { type: Date }, // Password Reset Token Expiry (Optional)
    loginToken: { type: String }, // Login Token (Optional)
    loginTokenExpiryTime: { type: String },
    // Tour-related Fields
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // Reference to bookings
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }], // Saved tours

    createdAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);


userSchema.pre("save", async function(next) {
  if (!this.isModified('password')) {
      next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
  try {
      return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
      throw error;
  }
};

// Method to generate account verification token
userSchema.methods.createAccountVerificationToken = async function() {
  try {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
      this.accountVerificationToken = hashedToken;
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      this.accountVerificationTokenExpires = expirationTime;
      return verificationToken;
  } catch (error) {
      throw error;
  }
};

// Method to generate password reset token
userSchema.methods.createPasswordResetToken = async function() {
  try {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      this.passwordResetToken = hashedToken;
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      this.passwordResetTokenExpires = expirationTime;
      return resetToken;
  } catch (error) {
      throw error;
  }

}
// Create User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
