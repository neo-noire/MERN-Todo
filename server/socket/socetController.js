import Dialog from "../models/Dialog.js";
import { tokenController } from "../controllers/tokenController.js";

export const socetController = async (data) => {
    const text = data.text;
    const dialogId = data.dialogId;

    const sender = tokenController(data.token)
    console.log('this is sender', sender);

    await Dialog.findByIdAndUpdate(dialogId,
        {
            $push: {
                'messages': {
                    sender: sender,
                    messageBody: text
                }
            }
        })
    const dialog = await Dialog.findById(dialogId)

    return { dialog, dialogId }

}
