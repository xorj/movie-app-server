import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    const user = await User.create({ ...req.body, reviews: [] });
    const { id, name, email } = user;
    return res.json({ id, name, email });
  }

  async watchlist(req, res) {
    const { user_id } = req.body;
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    console.log(user);
    return res.status(200).json({ user.watchlist });
  }

  async addToWatchlist(req, res) {
    const { movie_id } = req.params;
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (user.watchlist.includes(movie_id)) {
      return res.status(401).json({
        error: "Movie already on the watchlist",
      });
    }
    if (user.watchlist.indexOf(Number(movie_id)) === -1) {
      user.watchlist = [...user.watchlist, movie_id];
    }
    user.save();
    return res.json({
      message: "Movie added to watchlist",
      movie_id,
    });
  }
  async removeFromWatchlist(req, res) {
    const { movie_id } = req.params;

    const { user_id } = req.body;

    const user = await User.findByPk(user_id);

    if (user.watchlist.indexOf(Number(movie_id)) === -1) {
      return res.status(401).json({
        error: "Movie isn't in watchlist",
      });
    }

    user.watchlist = user.watchlist.filter((id) => id != Number(movie_id));

    user.save();
    return res.json({
      message: "Movie removed from watchlist",
      movie_id,
    });
  }
}

export default new UserController();
