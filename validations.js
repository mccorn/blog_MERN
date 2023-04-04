import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля должна первышать 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля должна первышать 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверный формат ссылки (изображение)').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введитке текст статьи').isLength({ min: 15 }).isString(),
    body('tags', 'Неверный формат тэгов. Укажите массив').optional().isString(),
    body('imageUrl', 'Неверный формат ссылки (изображение)').optional().isURL(),
]