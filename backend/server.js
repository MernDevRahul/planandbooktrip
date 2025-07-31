const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const MongoStore = require("connect-mongo");
require("./config/passport/passportConfig"); // Initialize passport config
dotenv.config();
const dbConnect = require("./db/connectDB");
const User = require("./modal/user/user"); // Ensure User model is imported
const app = express();
const path = require('path');
const PORT = 5005;
const routes = require("./routes/allRoutes/allRoutes");
const reviewRoutes = require("./routes/reviewRoutes/reviewRoutes");
// Allowed Origins
const allowedOrigins = ["https://accounts.google.com","https://www.planandbooktrip.com","https://planandbooktrip.com/","https://backend.planandbooktrip.com/","https://planandbooktrip.com","https://backend.planandbooktrip.com","https://panel.planandbooktrip.com","https://panel.planandbooktrip.com/","http://localhost:3000","http://localhost:3005","http://localhost:5173"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure this line is present

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/banners', express.static(path.join(__dirname, 'uploads', 'banners')));
app.use('/categories', express.static(path.join(__dirname, 'uploads', 'categories')));
app.use('/blogImages', express.static(path.join(__dirname, 'uploads', 'blogImages')));
app.use('/packagesImages', express.static(path.join(__dirname, 'uploads', 'packagesImages')));
dbConnect();
// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
      maxAge: 1 * 60 * 1000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
    },
  })
);

app.use('/categories', express.static(path.join(__dirname, 'uploads', 'categories')));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.use(routes);

// Test session route
app.get("/google-session", (req, res) => {
  if (req.session.user) {
    res.json({ message: "Session found", sessionData: req.session.user });
  } else {
    res.status(401).json({ message: "No session found" });
  }
});

app.get("/token/token-session", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token, process.env.JWT_KEY);
  
  // console.log(decoded);
  const decodedUser = await User.findById(decoded?.id)
  const serverResponse={
    profilePicture: decodedUser?.profilePicture,
    firstName: decodedUser?.firstName,
    lastName: decodedUser?.lastName,
    token: decodedUser?.loginToken,
    tokenExpiryTime:decodedUser?.loginTokenExpiryToken,
    role: decodedUser?.role,
    email: decodedUser?.email,
    accountStatus: decodedUser?.accountStatus,
  }
  if (decodedUser) {
    res.json({ message: "Session found", sessionData: serverResponse });
  } else {
    res.status(401).json({ message: "No session found" });
  }
});


// Fallback 404 Route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS error: Origin not allowed" });
  }
  next(err);
});

app.get("/", (req, res) => {  
  res.send("Server is running successfully");
})
// Start Server
app.listen(PORT, () => {
  // console.log(`Server started at port ${PORT}`);
});
