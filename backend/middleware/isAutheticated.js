
const jwt = require("jsonwebtoken");
const User = require("../modal/user/user");



const  isAuthenticatedAdmin = async (req, res, next) => {
  try {
      // Extract the Authorization header
      const authHeader = req.headers.authorization;
     
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
      console.log(authenticUser.role);
    if (authenticUser.role !="admin" && authenticUser.role!="super-admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      // Ensure to call next() to proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error during authentication:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }

};


const  isAuthenticatedSuperAdmin = async (req, res, next) => {
  try {
      // Extract the Authorization header
      const authHeader = req.headers.authorization;
      console.log(authHeader);
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
      
     if (authenticUser.role !== "super-admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      // Ensure to call next() to proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error during authentication:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }

};

module.exports={isAuthenticatedAdmin,isAuthenticatedSuperAdmin}
