import { Request, Response } from "express";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import { usersRouter } from "@/routes/users-router";

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

    res.json({ name, email, password, role });
  }
}

export { UserController };
