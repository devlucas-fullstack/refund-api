"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = allowRoles;
const AppError_1 = require("../utils/AppError");
function allowRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            throw new AppError_1.AppError("Usuário não autenticado!", 401);
        }
        if (!roles.includes(user.role)) {
            throw new AppError_1.AppError("Acesso não permitido!", 403);
        }
        return next();
    };
}
