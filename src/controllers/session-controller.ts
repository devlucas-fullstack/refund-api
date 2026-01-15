import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../database/prisma";
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { jwtConfig } from "../configs/jwt";
import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";

class SessionController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Email e/ou senha inválido!", 401);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError("Email e/ou senha inválidos!", 401);
    }

    const { secret, expiresIn } = jwtConfig.jwt;
    const token = jwt.sign({ role: user.role }, secret, {
      expiresIn,
      subject: String(user.id),
    });

    res.json({ token, user });
  }
}

export { SessionController };
