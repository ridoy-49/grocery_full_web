import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ succes: false, message: "Token is missing" })
    }
    try {
        const tokenDecode =  jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;

        } else {
            return res.json({ succes: false, message: "Not Authorized" })
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }
}

export default authUser;