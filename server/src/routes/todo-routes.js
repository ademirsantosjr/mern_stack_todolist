const express = require('express');
const todoController = require('../controllers/todoController')
const router = express.Router();

router.get('/', todoController.getAll);
router.get('/archived', todoController.getAllArchived);
router.get('/:description', todoController.getByDescriptionInput);

router.post('/new', todoController.createOne);

router.patch('/update/:id', todoController.updateOne);
router.patch('/update/done/:id', todoController.updateToDone);
router.patch('/update/archive/:id', todoController.updateToArchived);

router.delete('/delete/:id', todoController.deleteById);

module.exports = router;