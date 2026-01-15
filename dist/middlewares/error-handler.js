"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
const zod_1 = require("zod");
function errorHandler(error, req, res, next) {
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Validation error!",
            issues: error.format(),
        });
    }
    res.status(500).json({
        status: "error",
        message: error.message || "Erro interno no servidor",
    });
}
