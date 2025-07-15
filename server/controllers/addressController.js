//Add address

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const userId = req.user.id
        const { address } = req.body;
        await Address.create({ ...address, userId })
        res.json({ success: true, message: "Address Added Successfully" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }
}

///get Address
export const getAddress = async (req, res) => {
    try {
        const  userId  = req.user.id;
        const addresses = await Address.find({ userId })
        res.json({ success: true, message: "Address get Successfully", addresses })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}