const request = require('supertest');
const app = require('./app');
const pool = require('./database/db');
require("dotenv").config()


beforeAll(async () => {
  // Set up test database with fake data
  console.log("WHO'S THAT WITH HEATHER?")
  await pool.query('INSERT INTO Teachers (Name, PhoneNumber) VALUES ($1, $2)', [
    'Test Teacher 1',
    '123-456-7890',
  ]);

  await pool.query('INSERT INTO Teachers (Name, PhoneNumber) VALUES ($1, $2)', [
    'Test Teacher 2',
    '987-654-3210',
  ]);

  await pool.query('INSERT INTO Students (Name, Grade) VALUES ($1, $2)', [
    'Test Student 1',
    11,
  ]);

  await pool.query('INSERT INTO Students (Name, Grade) VALUES ($1, $2)', [
    'Test Student 2',
    10,
  ]);
});

afterAll(async () => {
  // Clean up the test database
  // Deleting Teachers
  await pool.query('DELETE FROM Teachers WHERE Name = $1 AND PhoneNumber = $2', [
    'Test Teacher 1',
    '123-456-7890',
  ]);

  await pool.query('DELETE FROM Teachers WHERE Name = $1 AND PhoneNumber = $2', [
    'Test Teacher 2',
    '987-654-3210',
  ]);

  // Deleting Students
  await pool.query('DELETE FROM Students WHERE Name = $1 AND Grade = $2', [
    'Test Student 1',
    11,
  ]);

  await pool.query('DELETE FROM Students WHERE Name = $1 AND Grade = $2', [
    'Test Student 2',
    10,
  ]);

  await pool.end(); // Close the database connection
});

describe('GET /teachers', () => {
  test('should get all teachers', async () => {
    const response = await request(app).get('/teachers');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    expect(response.body[3].name).toBe('Test Teacher 1');
    expect(response.body[4].name).toBe('Test Teacher 2');
  });
});

describe('GET /students', () => {
  test('should get all students', async () => {
    const response = await request(app).get('/students');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(7);
    expect(response.body[5].name).toBe('Test Student 1');
    expect(response.body[6].name).toBe('Test Student 2');
  });
});
