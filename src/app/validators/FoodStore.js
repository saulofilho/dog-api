const Yup = require('yup');

module.exports = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      food: Yup.string().required(),
      eat: Yup.string().required(),
      infos: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
