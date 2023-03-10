import mongoose, { Schema } from 'mongoose';

const DialogSchema = new Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        messageBody: {  // body of the message(text body/ image blob/ video blob)
            type: String,
        },
        messageType: { // type of the message(text, mp3, mp4, etc...)
            type: String,
        },
        read: { // to boolean flag to mark whether the to user has read the message 
            type: Boolean,
            default: false,
        },
        createdAt: { // when was this message goit created
            type: Date,
            default: new Date(),
        },
    }],

}, { timestamps: true })


export default mongoose.model('Dialog', DialogSchema)