const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  assignee: String,
  description: String
});
const ProjectSchema = new mongoose.Schema({
  name: String,
  tasks: [TaskSchema]
});
module.exports = mongoose.model('Project', ProjectSchema);
