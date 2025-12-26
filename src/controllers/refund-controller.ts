import { Request, Response } from "express";

class RefundController {
  async create(req: Request, res: Response) {
    res.json({ message: "ok" });
  }
}

export { RefundController };
