import jwt from "jsonwebtoken";
import { promisify } from "util";

//Configuração de Auteticação
import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);

  if (!authHeader) {
    return res.status(401).json({
      error: "Token not provided",
    });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.body.user_id = decoded.id;
    req.body.user_name = decoded.name;
    return next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
};
