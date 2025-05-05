const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = new Project({ name: req.body.name, tasks: [] });
  await project.save();
  res.status(201).send('Project created');
});

router.post('/:id/tasks', async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.tasks.push({ assignee: req.body.assignee, description: req.body.description });
  await project.save();
  res.status(201).send('Task added');
});

module.exports = router;
