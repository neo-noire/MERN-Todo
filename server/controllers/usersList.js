import User from "../models/User.js";

//get all registered users
export const getUsersList = async (req, res) => {
    try {
        const allUsers = await User.find()
        const me = await User.findById(req.userId)

        if (!allUsers) {
            return res.json({
                message: 'You are only one on this planet'
            })
        }

        const users = allUsers.map(el => {
            const user = {
                email: el.email,
                username: el.username,
                userId: el._id,
            }
            return user
        }).filter(el => !el.userId.equals(req.userId))
        const followRequests = me.userFollowRequests;
        return res.json({
            followRequests,
            users,
            message: 'these are all users'
        })
    } catch (error) {

        res.json({ message: `${req.body}` })
    }
}

//follow user request
export const followUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        const follower = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: `This user doesn't exist`
            })
        }
        await User.findByIdAndUpdate(userId,
            {
                $addToSet: { followRequestsFromUsers: follower }
            })

        await User.findByIdAndUpdate(req.userId,
            {
                $addToSet: { userFollowRequests: user }
            })

        return res.json({
            message: `You send follow request`
        })
    } catch (error) {
        res.json({ error })
    }
}

//Unfollow user request
export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        const follower = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: `This user doesn't exist`
            })
        }
        await User.findByIdAndUpdate(userId,
            {
                $unset: { followRequestsFromUsers: follower }
            })

        await User.findByIdAndUpdate(req.userId,
            {
                $unset: { userFollowRequests: user }
            })

        return res.json({
            message: `You have unfollowed ${user.username}`
        })
    } catch (error) {

        res.json({ error })
    }
}
