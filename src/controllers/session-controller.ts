import { Request, Response } from "express";

class SessionController {
  async create(req: Request, res: Response) {
    res.json({ message: "ok" });
  }
}

export { SessionController };
