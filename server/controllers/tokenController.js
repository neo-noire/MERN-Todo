import jwt from "jsonwebtoken";

export const tokenController = (token) => {
    const isToken = (token || '').replace(/Bearer\s?/, '')

    if (!isToken) return

    const decoded = jwt.verify(isToken, process.env.JWT_SECRET)
    const sender = decoded.id

    return sender
}