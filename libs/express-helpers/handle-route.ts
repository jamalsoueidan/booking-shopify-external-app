import { validationResult } from "express-validator";

export const expressHelpers = (controller) => async (req, res) => {
  try {
    const { errors } = validationResult(req) as any;
    if (errors.length) {
      throw errors;
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
