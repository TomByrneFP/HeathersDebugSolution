const db = require('../database/db');
require("dotenv").config()
class Teacher {
  static async getAllTeachers() {
    try {
      const query = 'SELECT * FROM teachers;';
      const {rows}  = await db.query(query);
      return rows;
    } catch (error) {
      console.log(`Error ${error}`)
      throw new Error('Failed to fetch teachers');
    }
  }

  static async getTeacherById(id) {
    try {
      const query = 'SELECT * FROM Teachers WHERE TeacherID = $1';
      const values = [id];
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error('Teacher not found');
      }
      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch teacher');
    }
  }

  static async createTeacher(teacher) {
    try {
      const query =
        'INSERT INTO Teachers (Name, PhoneNumber) VALUES ($1, $2) RETURNING *';
      const values = [teacher.Name, teacher.PhoneNumber];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to create teacher');
    }
  }

  static async updateTeacher(id, updatedTeacher) {
    try {
      const query =
        'UPDATE Teachers SET Name = $1, PhoneNumber = $2 WHERE TeacherID = $3 RETURNING *';
      const values = [updatedTeacher.Name, updatedTeacher.PhoneNumber, id];
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error('Teacher not found');
      }
      return rows[0];
    } catch (error) {
      throw new Error('Failed to update teacher');
    }
  }

  static async deleteTeacher(id) {
    try {
      const query = 'DELETE FROM Teachers WHERE TeacherID = $1';
      const values = [id];
      await db.query(query, values);
    } catch (error) {
      throw new Error('Failed to delete teacher');
    }
  }
}

module.exports = Teacher;
