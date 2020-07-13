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
routes.use(authMiddleware);
//Add user's review to movie
routes.post("/user/reviews/:movie_id", ReviewController.store);
//Remove review
routes.delete("/user/reviews/:movie_id", ReviewController.erase);
//Watchlist Index
routes.get("/user/watchlist", UserController.watchlist);
//Add a movie to the user watchlist
routes.post("/user/watchlist/:movie_id", UserController.addToWatchlist);
//Remove a movie from a authenticated user
routes.delete("/user/watchlist/:movie_id", UserController.removeFromWatchlist);

export default routes;
