const db = require('../../models');

module.exports = {
  index,
  show,
  create,
  delete: deleteOne,
  update,
};

async function index(req, res) {
  const users = await db.User.findAll();
  res.status(200).json(users);
}

async function show(req, res) {
  const user = await db.User.findByPk(req.params.id);
  res.status(200).json(user);
}

async function create(req, res) {
  const user = await db.User.create(req.body);
  res.status(201).json(user);
}

async function deleteOne(req, res) {
  const usersDeleted = await db.User.destroy({ where: { id: req.params.id }});
  res.status(200).json({ usersDeleted: usersDeleted });
}

async function update(req, res) {
  await db.User.update(req.body, { where: { id: req.params.id }});
  const updatedUser = await db.User.findByPk(req.params.id);
  res.status(200).json(updatedUser);
}
