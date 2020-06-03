const Food = require('../models/Food');

class FoodController {
  async index(req, res) {
    try {
      if (typeof req.query.food !== 'undefined') {
        const foods = await Food.findAll({ where: { food: req.query.food } });
        return res.json(foods);
      } else {
        const foods = await Food.findAll();
        return res.json(foods);
      }
    } catch (err) {
      return err.json({ error: '[100] Not search params text in query.' });
    }

    // if (typeof req.query.food !== 'undefined') {
    //   const searchFood = await Food.findAll({
    //     where: { food: req.query.food },
    //   });
    //   return res.json(searchFood);
    // } else if (typeof req.query.food === []) {
    //   return res.json({ error: '[100] Not search params text in query.' });
    // } else {
    //   const foods = await Food.findAll();
    //   return res.json(foods);
    // }
  }

  async store(req, res) {
    const { food, eat, infos } = req.body;

    const addFood = await Food.create({
      user_id: req.userId,
      food,
      eat,
      infos,
    });

    return res.json(addFood);
  }

  async delete(req, res) {
    const food = await Food.findByPk(req.params.id);

    await food.destroy();

    return res.json(food);
  }
}

module.exports = new FoodController();
