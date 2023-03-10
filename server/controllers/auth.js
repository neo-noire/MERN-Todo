import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Register User
export const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const isUsedEmail = await User.findOne({ email })
        const isUsedName = await User.findOne({ username })

        if (isUsedEmail) return res
            .json({ message: 'Thiss email already registered ' })

        if (isUsedName) return res
            .json({ message: 'This user name is already used' })

        const salt = bcrypt.genSaltSync(10)

        const hashPassword = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        const token = jwt.sign({
            id: newUser._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        )
        await newUser.save()

        res.json({
            token,
            newUser,
            message: 'Registration successfull'
        })
    } catch (error) {
        res.json({ message: 'Registration error ' })
    }
}

//Login User
export const login = async (req, res) => {
    try {
        const { emailOrPassword, password } = req.body;


        //login by Email

        const user = await User.findOne({
            $or: [
                { email: emailOrPassword },
                { username: emailOrPassword }
            ]
        })

        if (!user) return res
            .json({ message: 'This email is not registered' })

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if (!isPassCorrect) return res
            .json({ message: 'Incorrect Password' })

        const token = jwt.sign({
            id: user._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        )

        res.json({
            token,
            user: user,
            message: "You are logged in"
        })


    } catch (error) {
        res.json({ message: 'Login error ' })
        console.log(error.message);
    }
}

//Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: "This user doesnot exist"
            })
        }


        const token = jwt.sign({
            id: user._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        )

        res.json({
            user,
            token
        })


    } catch (error) {
        res.json({ message: 'No access' })
    }
}