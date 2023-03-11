import Dialog from "../models/Dialog.js";
import jwt from "jsonwebtoken";

const sockets = (socket) => {
    socket.on('send-message', async (data) => {
        const token = (data.token || '').replace(/Bearer\s?/, '')
        const text = data.text;
        const dialogId = data.dialogId;


        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const sender = decoded.id

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
                 socket.emit('from-server-message', (dialog))
                 socket.broadcast.emit('from-server-message', (dialog))

            } catch (error) {
                socket.emit('from-server-message', error)
            } 
        }
        console.log('msg send');
        // try {
        //     await Dialog.findByIdAndUpdate(dialog,
        //         {
        //             $push: {
        //                 'messages': {
        //                     sender: msgFrom,
        //                     messageBody: text
        //                 }
        //             }
        //         })
        // } catch (error) {

        // }
    })
    socket.on('user-start-typing', () => {
        socket.broadcast.emit('user-typing-from-server')
        console.log('typing');
    })
    socket.on('user-stop-typing', () => {
        socket.broadcast.emit('stop-typing-from-server')
        console.log('stop typing');
    })
    socket.on('disconnect', () => {
        console.log('user left');
    })
}

export default sockets;