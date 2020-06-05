const Food = require('../models/Food');

class FoodController {
  async indexAll(req, res) {
    const foods = await Food.findAll();

    res.json(foods);
  }

  async index(req, res) {
    const { food } = req.query;

    const foodItem = await Food.findOne({ where: { food: food } });

    if (foodItem === null) {
      res.json({ error: 'Food not found!' });
    } else {
      res.json(foodItem);
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

    if (foodEdit === null) {
      res.json({ error: 'Food not found!' });
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
