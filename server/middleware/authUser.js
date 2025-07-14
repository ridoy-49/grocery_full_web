import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Token is missing" })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
            req.user = tokenDecode
            next()

        } else {
            return res.json({ success: false, message: "Not Authorized" })
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }
}

export default authUser;