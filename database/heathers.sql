-- Drop tables if they exist
DROP TABLE IF EXISTS STUDENT_CLASSES;
DROP TABLE IF EXISTS Classes;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Teachers;

-- Create the Teachers table
CREATE TABLE Teachers (
  TeacherID SERIAL PRIMARY KEY,
  Name VARCHAR(30),
  PhoneNumber VARCHAR
);

-- Insert data into the Teachers table
INSERT INTO Teachers (Name, PhoneNumber) VALUES
  ('Ms. Fleming', '123-456-7890'),
  ('Mr. Sawyer', '987-654-3210'),
  ('Mrs. Duke', '555-123-4567');

-- Create the Students table
CREATE TABLE Students (
  StudentID SERIAL PRIMARY KEY,
  Name VARCHAR,
  Grade INT
);

-- Insert data into the Students table
INSERT INTO Students (Name, Grade) VALUES
  ('Veronica Sawyer', 11),
  ('Jason Dean', 12),
  ('Heather Chandler', 10),
  ('Heather McNamara', 11),
  ('Heather Duke', 10);

-- Create the Classes table
CREATE TABLE Classes (
  ClassID SERIAL PRIMARY KEY,
  ClassName VARCHAR,
  TeacherID INT REFERENCES Teachers(TeacherID)
);

-- Insert data into the Classes table
INSERT INTO Classes (ClassName, TeacherID) VALUES
  ('English', 1),
  ('Drama', 2),
  ('History', 3);

-- Create the STUDENT_CLASSES table
CREATE TABLE STUDENT_CLASSES (
  Student_ClassesID SERIAL PRIMARY KEY,
  ClassID INT REFERENCES Classes(ClassID),
  StudentID INT REFERENCES Students(StudentID)
);

-- Insert data into the STUDENT_CLASSES table
INSERT INTO STUDENT_CLASSES (ClassID, StudentID) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (1, 4),
  (2, 5);
