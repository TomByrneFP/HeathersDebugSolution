const Teacher = require('../models/Teacher');

module.exports = {
  getAllTeachers: async (req, res) => {
    try {
      const teachers = await Teacher.getAllTeachers();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch teachers' });
    }
  },

  getTeacherById: async (req, res) => {
    try {
      const { id } = req.params;
      const teacher = await Teacher.getTeacherById(id);
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch teacher' });
    }
  },

  createTeacher: async (req, res) => {
    try {
      const { Name, PhoneNumber } = req.body;
      const teacher = await Teacher.createTeacher({ Name, PhoneNumber });
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create teacher' });
    }
  },

  updateTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, PhoneNumber } = req.body;
      const updatedTeacher = await Teacher.updateTeacher(id, { Name, PhoneNumber });
      res.json(updatedTeacher);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update teacher' });
    }
  },

  deleteTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      await Teacher.deleteTeacher(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete teacher' });
    }
  },
};
