import { nextDay } from "date-fns";
import { validationResult } from "express-validator";

export const expressHelpers =
  (controller, role?: number) => async (req, res, next) => {
    try {
      const { errors } = validationResult(req) as any;
      if (errors.length) {
        throw errors;
      }

      if (role && role > req.session.role) {
        next();
      }

      res.status(202).send({
        success: true,
        payload: await controller({
          query: {
            shop: req.query.shop, //|| session.shop,
            ...req.query,
            ...req.params,
          },
          body: req.body,
          session: req.session,
        }),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? `${error}` : error,
      });
    }
  };
