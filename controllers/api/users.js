const db = require('../../models');

module.exports = {
  index,
  show,
  create,
  delete: deleteOne,
  update,
};

async function index(req, res) {
  let users = await db.User.findAll();
  users.forEach(user => delete user.dataValues.password);
  res.status(200).json(users);
}

async function show(req, res) {
  const user = await db.User.findByPk(req.params.id);
  res.status(200).json(user);
}

async function create(req, res) {
  try {
    let user = await db.User.create(req.body);
    delete user.dataValues.password;
    res.status(201).json(user);
  } catch (error) {
    res.status(400).end();
  }
}

async function deleteOne(req, res) {
  const usersDeleted = await db.User.destroy({ where: { id: req.params.id }});
  res.status(200).json({ usersDeleted: usersDeleted });
}

async function update(req, res) {
  try {
    await db.User.update(req.body, { where: { id: req.params.id }});
    let updatedUser = await db.User.findByPk(req.params.id);
    delete updatedUser.dataValues.password;
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).end();
  }
}
