import Student from '../models/student.js';
import Mentor from '../models/mentor.js';

export const createStudent = async (req, res) => {
    try {
        const { name, email, subject } = req.body;

        const student = new Student({ name, email, subject });
        await student.save();

        res.status(201).send({
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error: error.stack
        });
    }
};

export const assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).send({
                message: "Mentor not found"
            });
        }

        const students = await Student.find({ _id: { $in: studentIds }, mentor: { $exists: false } });
        if (students.length === 0) {
            return res.status(404).send({
                message: "No students found or already assigned to a mentor"
            });
        }

        await Student.updateMany(
            { _id: { $in: studentIds } },
            { $set: { mentor: mentorId } }
        );

        res.status(200).send({
            message: "Students assigned to mentor successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error: error.stack
        });
    }
};

export const changeMentorForStudent = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({
                message: "Student not found"
            });
        }

        if (student.mentor) {
            student.previousMentors.push(student.mentor);
        }

        student.mentor = mentorId;
        await student.save();

        res.status(200).send({
            message: "Mentor changed successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error: error.stack
        });
    }
};

export const getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const students = await Student.find({ mentor: mentorId });
        if (!students || students.length === 0) {
            return res.status(404).send({
                message: "No students found for this mentor"
            });
        }

        res.status(200).send({
            data: students
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error: error.stack
        });
    }
};

export const getPreviousMentorsForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId).populate('previousMentors');
        if (!student) {
            return res.status(404).send({
                message: "Student not found"
            });
        }

        res.status(200).send({
            data: student.previousMentors
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error: error.stack
        });
    }
};
