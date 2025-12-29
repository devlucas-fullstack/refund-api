import prisma from "@/database/prisma";
import { AppError } from "@/utils/AppError";
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
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);

    if (!req.user.id) {
      throw new AppError("Não autorizado!", 401);
    }

    await prisma.refund.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: req.user.id,
      },
    });

    res.status(201).json();
  }

  async index(req: Request, res: Response) {
    return res.json({ message: "ok" });
  }
}

export { RefundController };
