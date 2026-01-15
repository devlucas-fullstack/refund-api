import prisma from "../database/prisma";
import { AppError } from "../utils/AppError";
import { Request, Response } from "express";
import { z } from "zod";

const categoryEnum = z.enum([
  "food",
  "others",
  "transport",
  "accommodation",
  "services",
]);

class RefundController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(1, { message: "Informe o nome da solicitação!" }),
      category: categoryEnum,
      amount: z.number().positive(),
    });

    const { name, category, amount } = bodySchema.parse(req.body);

    if (!req.user.id) {
      throw new AppError("Não autorizado!", 401);
    }

    await prisma.refund.create({
      data: {
        name,
        category,
        amount,
        userId: req.user.id,
      },
    });

    res.status(201).json();
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(req.query);

    const skip = (page - 1) * perPage;

    const refunds = await prisma.refund.findMany({
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

    const totalRecords = await prisma.refund.count({
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

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const refund = await prisma.refund.findFirst({
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
      throw new AppError("Reembolso não encontrado", 404);
    }

    if (req.user?.role === "employee" && refund.userId !== req.user.id) {
      throw new AppError("Acesso não permitido", 403);
    }

    res.json(refund);
  }
}

export { RefundController };
