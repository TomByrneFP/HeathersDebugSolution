const pool = require('../database/db');
require("dotenv").config()
class Student {
  static async getAllStudents() {
    try {
      const query = 'SELECT * FROM Students';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  }

  static async getStudentById(id) {
    try {
      const query = 'SELECT * FROM Students WHERE StudentID = $1';
      const values = [id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        throw new Error('Student not found');
      }
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch student');
    }
  }

  static async createStudent(student) {
    try {
      const query = 'INSERT INTO Students (Name, Grade) VALUES ($1, $2) RETURNING *';
      const values = [student.Name, student.Grade];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to create student');
    }
  }

  static async updateStudent(id, updatedStudent) {
    try {
      const query =
        'UPDATE Students SET Name = $1, Grade = $2 WHERE StudentID = $3 RETURNING *';
      const values = [updatedStudent.Name, updatedStudent.Grade, id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        throw new Error('Student not found');
      }
      return rows[0];
    } catch (error) {
      throw new Error('Failed to update student');
    }
  }

  static async deleteStudent(id) {
    try {
      const query = 'DELETE FROM Students WHERE StudentID = $1';
      const values = [id];
      await pool.query(query, values);
    } catch (error) {
      throw new Error('Failed to delete student');
    }
  }
}

module.exports = Student;
