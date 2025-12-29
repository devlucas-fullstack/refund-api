import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function allowRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new AppError("Usuário não autenticado!", 401);
    }

    if (!roles.includes(user.role)) {
      throw new AppError("Acesso não permitido!", 403);
    }

    return next();
  };
}
