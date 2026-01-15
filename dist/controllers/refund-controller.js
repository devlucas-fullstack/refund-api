"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundController = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
const AppError_1 = require("../utils/AppError");
const zod_1 = require("zod");
const categoryEnum = zod_1.z.enum([
    "food",
    "others",
    "transport",
    "accommodation",
    "services",
]);
class RefundController {
    async create(req, res) {
        const bodySchema = zod_1.z.object({
            name: zod_1.z.string().min(1, { message: "Informe o nome da solicitação!" }),
            category: categoryEnum,
            amount: zod_1.z.number().positive(),
        });
        const { name, category, amount } = bodySchema.parse(req.body);
        if (!req.user.id) {
            throw new AppError_1.AppError("Não autorizado!", 401);
        }
        await prisma_1.default.refund.create({
            data: {
                name,
                category,
                amount,
                userId: req.user.id,
            },
        });
        res.status(201).json();
    }
    async index(req, res) {
        const querySchema = zod_1.z.object({
            name: zod_1.z.string().optional().default(""),
            page: zod_1.z.coerce.number().optional().default(1),
            perPage: zod_1.z.coerce.number().optional().default(10),
        });
        const { name, page, perPage } = querySchema.parse(req.query);
        const skip = (page - 1) * perPage;
        const refunds = await prisma_1.default.refund.findMany({
            skip,
            take: perPage,
            where: {
                user: {
                    is: {
                        name: {
                            contains: name.trim(),
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        const totalRecords = await prisma_1.default.refund.count({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    },
                },
            },
        });
        const totalPage = Math.ceil(totalRecords / perPage);
        return res.json({
            refunds,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPage: totalPage > 0 ? totalPage : 1,
            },
        });
    }
    async show(req, res) {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = paramsSchema.parse(req.params);
        const refund = await prisma_1.default.refund.findFirst({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!refund) {
            throw new AppError_1.AppError("Reembolso não encontrado", 404);
        }
        if (req.user?.role === "employee" && refund.userId !== req.user.id) {
            throw new AppError_1.AppError("Acesso não permitido", 403);
        }
        res.json(refund);
    }
}
exports.RefundController = RefundController;
