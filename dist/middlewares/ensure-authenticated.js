"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const jwt_1 = require("../configs/jwt");
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.AppError("Token não informado!", 401);
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.jwtConfig.jwt.secret);
        request.user = {
            id: decoded.sub,
            role: decoded.role,
        };
        return next();
    }
    catch (error) {
        throw new AppError_1.AppError("Token inválido ou expirado!", 401);
    }
}
