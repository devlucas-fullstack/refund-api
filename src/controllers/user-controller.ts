import { Request, Response } from "express";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import prisma from "@/database/prisma";
import { hash } from "bcrypt";
import { AppError } from "@/utils/AppError";

class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "Nome deve ter no mínimo 2 dígitos!" }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 dígitos!" }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const hashedPassword = await hash(password, 8);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("Endereço de email já existe!");
    }

    await prisma.user.create({
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

export { UserController };
