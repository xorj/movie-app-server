import * as Yup from "yup";
import Review from "../models/Review";
import User from "../models/User";
import { Sequelize } from "sequelize";
class ReviewController {
  async index(req, res) {
    const { movie_id } = req.params;
    const reviews = Review.findAll({
      where: {
        movie_id,
      },
    });

    return res.json(reviews);
  }

  async store(req, res) {
    const { user_id } = req.body;
    const { movie_id } = req.params;

    const schema = Yup.object().shape({
      title: Yup.string().required().min(6),
      text: Yup.string().required().min(12),
      rating: Yup.number().required().min(0).max(10),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    //Checks is the user already has reviwed the movie
    const checkReview = await Review.findOne({
      where: {
        user_id,
        movie_id,
      },
    });

    if (checkReview) {
      return res.status(400).json({
        error: "User already has a review on this movie.",
      });
    }

    //Find the reviewer
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });

    //Add the review to the database
    const review = await Review.create({ ...req.body, movie_id });
    //Add movie_id so you can know what movies the user has reviewed
    if (user.reviews.indexOf(movie_id) === -1) {
      user.reviews = [...user.reviews, movie_id];
    }
    user.save();

    const { title, text } = review;
    return res.json({ title, text, user_id, movie_id });
  }

  async erase(req, res) {
    const { movie_id } = req.params;
    const { user_id } = req.body;
    //Remove the movie_id to the review]
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (user) {
      user.reviews = user.reviews.filter((id) => id != movie_id);
    }
    user.save();

    const review = await Review.findOne({
      where: {
        user_id,
        movie_id,
      },
    });

    if (!review) {
      return res.status(401).json({
        error: "Review doesn't exist",
      });
    } else {
      await Review.destroy({
        where: {
          user_id,
          movie_id,
        },
      });
    }

    //Remove the review id to the revie

    return res.json({
      message: "Review deleted",
    });
  }
}

export default new ReviewController();
