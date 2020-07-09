import * as Yup from "yup";
import Review from "../models/Review";

class ReviewController {
  async index(req, res) {
    const { movie_id } = req.params;
    const reviews = Review.findAll({
      movie_id,
    });

    return res.json(reviews);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required().min(6),
      text: Yup.string().required().min(12),
      user_id: Yup.number(),
      movie_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
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

    const review = await Review.create(req.body);

    const { title, text, user_id, movie_id } = review;
    return res.json({ title, text, user_id, movie_id });
  }

  async delele(req, res) {
    const { movie_id } = req.params;
    const { userId } = req.body;

    const review = await Review.destroy({
      where: {
        user_id: userId,
        movie_id,
      },
    });

    return res.status(200).json({
      message: "Review deleted",
      ...review,
    });
  }
}

export default new ReviewController();
