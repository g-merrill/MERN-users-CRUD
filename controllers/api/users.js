const models = require('../../models/user');

module.exports = {
  index,
  // show,
  // create,
  // delete: deleteOne,
  // update
};

async function index(req, res) {
  const users = await models.User.findAll();
  res.status(200).json(users);
}

// async function show(req, res) {
//   const user = await models.User.findByPk(req.params.id);
//   res.status(200).json(user);
// }

// async function create(req, res) {
//   const user = await models.User.create(req.body);
//   res.status(201).json(user);
// }

// async function deleteOne(req, res) {
//   const usersDeleted = await models.User.destroy({ where: { id: req.params.id }});
//   res.status(200).json({ usersDeleted: usersDeleted });
// }

// async function update(req, res) {
//   const updatedUser = await models.User.Update(req.body, { where: { id: req.params.id }});
//   res.status(200).json(updatedUser);
// }
