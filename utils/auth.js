import jwt from "jsonwebtoken";

const AUTH_UTILS = {
    checkAuth: (req, res, next) => {
        const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

        if (token) {
            try {
                const decoded = jwt.verify(token, 'secret123');

                req.userID = decoded._id;
                next();
            } catch (err) {
                return res.status(400).json({ message: "Нет доступа" });
            }
        } else {
            return res.status(403).json({ message: "Нет доступа" });
        }
    },
}

export default AUTH_UTILS;