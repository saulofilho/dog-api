const Food = require('../models/Food');

class FoodController {
  async index(req, res) {
    const { food } = req.query;

    // try {
    //   if (typeof req.query.food !== 'undefined') {
    //     const foods = await Food.findAll({ where: { food } });
    //     return res.json(foods);
    //   } else {
    //     const foods = await Food.findAll();
    //     return res.json(foods);
    //   }
    // } catch (err) {
    //   return err.json({ error: '[100] Not search params text in query.' });
    // }

    if (req.query.food) {
      const foods = await Food.findAll({ where: { food } });
      return res.json(foods);
    } else if (req) {
      const foods = await Food.findAll();
      return res.json(foods);
    } else {
      return res.json({ error: '[100] Not search params text in query.' });
    }
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
