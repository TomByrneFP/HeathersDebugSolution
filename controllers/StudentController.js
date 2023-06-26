const Student = require('../models/Student');

module.exports = {
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.getStudentById(id);
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student' });
    }
  },

  createStudent: async (req, res) => {
    try {
      const { Name, Grade } = req.body;
      const student = await Student.createStudent({ Name, Grade });
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create student' });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, Grade } = req.body;
      const updatedStudent = await Student.updateStudent(id, { Name, Grade });
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update student' });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      await Student.deleteStudent(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete student' });
    }
  },
};
