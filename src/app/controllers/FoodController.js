const Yup = require('yup');
const Food = require('../models/Food');

class FoodController {
  async store(req, res) {
    const schema = Yup.object().shape({
      food: Yup.string().required(),
      eat: Yup.string().required(),
      infos: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { food, eat, infos } = req.body;

    const addFood = await Food.create({
      user_id: req.userId,
      food,
      eat,
      infos,
    });

    return res.json(addFood);
  }
}

module.exports = new FoodController();
