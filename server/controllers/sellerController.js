
import jwt from 'jsonwebtoken';


//seller login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (password === process.env.ADMIN_PASS && email === process.env.ADMIN_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })
            res.cookie("sellerToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.json({ succes: true, message: "Admin Logged In" })
        } else {
            return res.json({ succes: false, message: "invalid Credentials" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }
}

export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ succes: true , message:"Your are logged in as Seller"})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}

//logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ success: true, message: "Admin Logged Out" })

    } catch (error) {

        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}
