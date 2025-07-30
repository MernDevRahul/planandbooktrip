const User = require("../../modal/user/user");


const deleteAllUsers=async(req,res)=>{

    try {
        await User.deleteMany({});
        res.status(200).json({success:true,message:"All users deleted successfully"})        
    } catch (error) {
        res.status(500).json({success:false,message:error.message}) 
        // console.log(error)      

    }
}

const deactivateParticularUser = async (req, res) => {
    try {
        const id = req?.params?.id || req?.body?.id;

        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update account status to suspended
        const updatedUser = await User.findByIdAndUpdate(id, { accountStatus: "suspended" }, { new: true });

        res.status(200).json({
            success: true,
            message: "User suspended successfully",
            user: updatedUser
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


const getAllUsers=async(req,res)=>{

    try {
        const users=await User.find({});
        // console.log(users);
        res.status(200).json({success:true,data:users})        
    } catch (error) {
        res.status(500).json({success:false,message:error.message}) 
        // console.log(error)      

    }
}
// Fetch a single user by email ID
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    
    try {
        const user = await User.findOne({ email: email })
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const activateAccount = async (req, res) => {
    try {
        const id = req.params.id || req.body.id;

        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.accountStatus === "active") {
            return res.status(400).json({ success: false, message: "Account is already activated" });
        }

        // Update the account status to 'active' and remove activationToken
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { accountStatus:"active"},
            { new: true }
        );

        res.status(200).json({ success: true, message: "Account activated successfully", user: updatedUser });

    } catch (error) {
        // console.error("Account activation error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};




module.exports={deleteAllUsers,getAllUsers,getUserByEmail,deactivateParticularUser,activateAccount}