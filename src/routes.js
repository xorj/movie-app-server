import { Router } from "express";

//Importar controllers abaixo
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ReviewController from "./app/controllers/ReviewController";

//importar middlewares abaixo
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

//Routes
//Login and signin
routes.post("/signin", UserController.store);
routes.post("/login", SessionController.store);
//Reviews Index
routes.get("/reviews/:movie_id", ReviewController.index);

//Routes that require authentication
routes.post("/reviews/:movie_id", authMiddleware, SessionController.store);
routes.post("/reviews/:movie_id", authMiddleware, ReviewController.store);
// console.log(ReviewController.delele);
// routes.delete("/reviews/:movie_id", ReviewController.delete);

export default routes;
