import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      message: 'Student created successfully',
      student
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create student',
      error: error.message
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve students',
      error: error.message
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid student ID',
      error: error.message
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update student',
      error: error.message
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.status(200).json({
      message: 'Student deleted successfully',
      student
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete student',
      error: error.message
    });
  }
};
