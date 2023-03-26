import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validated;
      return next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const validationError = error as Error & { errors?: any };
        const [errors] = validationError.errors || [];
        return res.status(400).json({ message: errors });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  };
