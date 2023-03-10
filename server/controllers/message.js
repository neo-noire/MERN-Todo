import Dialog from "../models/Dialog.js";
import User from "../models/User.js";

//Get Dialog
export const getDialog = async (req, res) => {
    try {
        const { recieverId } = req.query;

        const msgTo = await User.findById(recieverId);
        const msgFrom = await User.findById(req.userId);

        if (!msgTo) {
            return res.json({
                message: `This user doesn't exist`
            })
        }

        const exist = await Dialog.find({
            $or: [
                { from: msgFrom, to: msgTo },
                { from: msgTo, to: msgFrom }
            ]
        })
        //adding a message between users
        if (exist.length === 0) {
            return res.json({
                message: `You didn't have any messages with this user`
            })
        }


        return res.json({
            exist,
            message: `this is your dialog`
        })
    } catch (error) {
        res.json({
            error,
            message: `Error during fetching dialog`
        })
    }
}

//Send Message
export const sendMessage = async (req, res) => {
    try {
        const { recieverId, text } = req.body;

        const msgTo = await User.findById(recieverId);
        const msgFrom = await User.findById(req.userId);

        if (!msgTo) {
            return res.json({
                message: `This user doesn't exist`
            })
        }

        const exist = await Dialog.find({
            $or: [
                { from: msgFrom, to: msgTo },
                { from: msgTo, to: msgFrom }
            ]
        })
        //adding a message between users
        if (exist.length !== 0) {
            await Dialog.findByIdAndUpdate(exist[0]._id,
                {
                    $push: {
                        'messages': {
                            sender: msgFrom,
                            messageBody: text
                        }
                    }

                })

            //this one return whole dialog
            const dialog = await Dialog.findOne(exist[0]._id);

            return res.json({
                dialog,
                message: `This dialog already exists`
            })
        }
        //if this is a first message between users, creating a new dialog
        const dialog = new Dialog({
            from: msgFrom,
            to: msgTo,
            messages: {
                sender: msgFrom,
                messageBody: text
            },
        })

        await dialog.save()

        return res.json({
            dialog,
            message: `You start dialog`
        })
    } catch (error) {
        res.json({
            error,
            message: `Error during sending message`
        })
    }
}