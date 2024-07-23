import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { makePasswordFieldForGoogleUser } from '../utils/passwordGenerator.js';

const saltRounds = 8;

const loginRegisterController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await User.findOne({ email: email, isDelete: false });

            if (!userData) {
                return res.status(404).json({ message: "User not found." });
            }

            // const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            const isPasswordMatch = password === userData.password;
            if (isPasswordMatch) {
                const token = jwt.sign(
                    {
                        user_id: userData._id,
                        email: userData.email,
                        role: userData.role,
                    },
                    process.env.JWT_SECRET
                );
                const responseData = {
                    token: token,
                    data: {
                        name: userData.name,
                        email: userData.email,
                        picture: userData.picture,
                        role: userData.role
                    }
                }
                // return res.cookie("token", token, {
                //     httpOnly: true,
                //     domain: "localhost",
                //     path: "/",
                //     sameSite: "lax",
                //     secure: false
                // }).status(200).json(responseData);
                return res.status(200).json(responseData);
            }
            else {
                return res.status(401).json({ message: "Invalid credentials." });
            }

        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async signInWithGoogle(req, res) {
        try {
            
            // sample response object from google
            // {    
            //     "iss": "https://accounts.google.com",
            //     "azp": "717811072731-709n4jd7nujhccpbgd2lhdcaridc2lho.apps.googleusercontent.com",
            //     "aud": "717811072731-709n4jd7nujhccpbgd2lhdcaridc2lho.apps.googleusercontent.com",
            //     "sub": "101604236082303974703",
            //     "hd": "rku.ac.in",
            //     "email": "abc@gmail.com",
            //     "email_verified": true,
            //     "nbf": 1715836863,
            //     "name": "ABC ABC",
            //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocLth2CcrjmECMUmBr3iW9MrSS6e59qAqOe91URENIPO0V9APg=s96-c",
            //     "given_name": "ABC",
            //     "family_name": "ABC",
            //     "iat": 1715837163,
            //     "exp": 1715840763,
            //     "jti": "ee02f1306ee0d4610351f7f06a543984af6c34ad"
            // }

            const { name, email, picture } = req.body;

            const userData = await User.findOneAndUpdate(
                {
                    email: email,
                    isDelete:false
                },
                {
                    name: name.toLowerCase(),
                    email: email,
                    password: makePasswordFieldForGoogleUser(),
                    //password: await bcrypt.hash(makePasswordFieldForGoogleUser(),saltRounds),
                    picture: picture,
                    isGoogleOAuth: true
                },
                {
                    upsert: true,
                    new: true
                }
            );
            
            const token = jwt.sign(
                {
                    user_id: userData._id,
                    email: userData.email,
                    role: userData.role,
                },
                process.env.JWT_SECRET
            );

            const responseData = {
                token: token,
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
    },

    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            let existingUser = await User.findOne({ email: email, isDelete: false });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists!" });
            } else {
                let doc = new User({
                    name: name,
                    email: email,
                    password: password,
                    //password: await bcrypt.hash(password,saltRounds)
                });

                const userData = await doc.save();
                const token = jwt.sign(
                    {
                        user_id: userData._id,
                        email: userData.email,
                        role: userData.role,
                    },
                    process.env.JWT_SECRET
                );
                const responseData = {
                    token: token,
                    data: {
                        name: userData.name,
                        email: userData.email,
                        picture: userData.picture,
                        role: userData.role
                    }
                }
                return res.status(201).json(responseData);
            }
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export { loginRegisterController };