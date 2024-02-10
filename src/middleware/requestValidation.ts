import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function requestValidation(zodSchema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const requestValidation = zodSchema.safeParse(req.query);
    if (!requestValidation.success) {
      const errors = requestValidation.error.format();
      res.status(400).send(errors);
    }

    // Utilize locals to pass data amongst the stack
    res.locals.requestData = requestValidation;
    next();
  };
}
