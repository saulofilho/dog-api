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

  async update(req, res) {
    const { food, eat, infos } = req.body;

    const foodEdit = await Food.findOne({ where: { food: req.body.food } });

    console.log(foodEdit);

    if (foodEdit === null) {
      res.json({ error: 'Food not found!' });
      console.log('Not found!');
    } else {
      const foodEdit = await Food.update(
        {
          food,
          eat,
          infos,
        },
        {
          where: {
            food,
          },
        }
      );
      console.log(foodEdit instanceof Food);
      console.log(foodEdit.food);
    }

    return res.json({
      food,
      eat,
      infos,
    });
  }
}

module.exports = new FoodController();
