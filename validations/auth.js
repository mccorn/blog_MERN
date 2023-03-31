import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля должна первышать 5 символов').isLength({ min: 5 }),
    body('fullName', 'Отсутствует имя').isLength({ min: 2 }),
    body('avatarUrl', 'Неверный формат ссылки').optional().isURL(),
]