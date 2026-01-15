"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../database/prisma"));
const bcrypt_1 = require("bcrypt");
const AppError_1 = require("../utils/AppError");
class UserController {
    async create(req, res) {
        const bodySchema = zod_1.z.object({
            name: zod_1.z
                .string()
                .trim()
                .min(2, { message: "Nome deve ter no mínimo 2 dígitos!" }),
            email: zod_1.z.string().email(),
            password: zod_1.z
                .string()
                .min(6, { message: "Senha deve ter no mínimo 6 dígitos!" }),
            role: zod_1.z
                .enum([client_1.UserRole.employee, client_1.UserRole.manager])
                .default(client_1.UserRole.employee),
        });
        const { name, email, password, role } = bodySchema.parse(req.body);
        const hashedPassword = await (0, bcrypt_1.hash)(password, 8);
        const userWithSameEmail = await prisma_1.default.user.findFirst({ where: { email } });
        if (userWithSameEmail) {
            throw new AppError_1.AppError("Endereço de email já existe!");
        }
        await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        res.status(201).json();
    }
}
exports.UserController = UserController;
