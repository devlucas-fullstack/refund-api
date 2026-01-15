"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../database/prisma"));
const AppError_1 = require("../utils/AppError");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("../configs/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SessionController {
    async create(req, res) {
        const bodySchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string(),
        });
        const { email, password } = bodySchema.parse(req.body);
        const user = await prisma_1.default.user.findFirst({ where: { email } });
        if (!user) {
            throw new AppError_1.AppError("Email e/ou senha inválido!", 401);
        }
        const matchedPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!matchedPassword) {
            throw new AppError_1.AppError("Email e/ou senha inválidos!", 401);
        }
        const { secret, expiresIn } = jwt_1.jwtConfig.jwt;
        const token = jsonwebtoken_1.default.sign({ role: user.role }, secret, {
            expiresIn,
            subject: String(user.id),
        });
        res.json({ token, user });
    }
}
exports.SessionController = SessionController;
