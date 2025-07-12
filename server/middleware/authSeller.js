import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.json({ succes: false, message: "Seller Token is missing" })
    }
    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if (tokenDecode.email === process.env.ADMIN_EMAIL) {
            next()
        } else {
            return res.json({ succes: false, message: "Seller Not Authorized" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }
}

export default authSeller;