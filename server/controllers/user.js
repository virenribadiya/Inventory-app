import { User } from "../models/index.js";

const userController = {
    async getLoginUserDetails(req, res) {
        try {
            const user = req.user;
            const userData = await User.findById(user.user_id);
            if (!userData) {
                return res.status(404).json({ message: "User details not found." });
            }

            const responseData = {
                data: {
                    name: userData.name,
                    email: userData.email,
                    picture: userData.picture,
                    role: userData.role
                }
            }
            return res.status(200).json(responseData);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export { userController };