import mentorModel from '../model/mentor.js'
import studentModel from '../model/student.js'

const getAllStudent = async (req, res) => {
    try {

        const students = await studentModel.find()
        res.status(200).send({
            message: "Data Fetch Successfull",
            data: students
        })

    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}
const createStudents = async (req, res) => {
    try {

        let { name, email, subject, batch, mentor, previousMentor } = req.body

        if (!name || !email || !subject) {
            return res.status(400).send({
                message: "All fields (name, email, subject, batch, mentor, previousmentor) are required"
            })
        }

        let exsisitingStudent = await studentModel.findOne({ name })

        if (exsisitingStudent) {
            return res.status(409).send({
                message: "Student With The Name Already Exist"
            })
        }
        const student = new studentModel({ name, email, subject, batch,mentor, previousMentor });
        await student.save();

        res.status(201).send({
            message: "Student created successfully",
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}
const studentWithoutMentor = async (req, res) => {
    try {
        const student = await studentModel.find({ mentor: null })
        res.status(400).send({
            message: "There is no Mentor For This Student",
            data: student
        })
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}
const assignStudentsToMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;

        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (student.mentor) {
            // If the student already has a mentor, store the previous mentor
            student.previousMentor.push(student.mentor);
        }
        // Update the student with the new mentor
        student.mentor = mentorId;
        await student.save();

        const mentor = await mentorModel.findByIdAndUpdate(
            mentorId,
            { $addToSet: { students: studentId } },
            { new: true }
        );
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).send({
            message: "Students assigned to mentor successfully",
            data: student
        })
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}


const oneMentorToManyStudent = async (req, res) => {
    try {
       const {mentorId} =req.params;
       const {studentIds} =req.body;

       const mentor= await mentorModel.findById(mentorId)

       if(!mentor){
         return res.status(404).send("Mentor not Found ")
       }

       for(const studentId of studentIds){
         const student=await studentModel.findById(studentId)
       if(student && !student.mentor){
        student.mentor=mentor._id;
        mentor.students.push(student._id)
        await student.save()
       }
       }
       await mentor.save();
       res.status(200).send({
        message:"Students Assigned To Mentor Successfully"
       })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

const changeMentorForPaticularStudent= async(req, res)=>{
    try{
        const {studentId,mentorId}=req.params;
        const student=await studentModel.findById(studentId);
        const mentor=await mentorModel.findById(mentorId)

       if(!studentId || !mentorId){
        return res.status(404).send({
            message:"student and mentor not found"
        })
       }
       if(student.mentor){
        student.previousMentor.push(student.mentor)
       }

       student.mentor=mentor._id;
        await student.save();
        await mentor.save();

        res.status(200).send({
            message:"Mentor change The Particular Student Successfull"
        })
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
}

const StudentForParticularMentor= async (req,res)=>{
    try{
         const {mentorId}= req.params;
         const mentor=await mentorModel.findById(mentorId).populate('students')

            if(!mentor){
                res.send("mentor not found")
            }
            res.status(200).send({
                message:"Fetch Mentor Details Successfull",
                data:mentor.students

            })
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
}
const previousMentorForParticularStudent= async(req,res)=>{
    try{
        const {studentId}=req.params;
        const student=await studentModel.findById(studentId).populate('previousMentor')
        if(!student){
            res.send("student not found")
        }
        res.status(200).send({
            message:"Fetch Student Details Sucesfull",
            data:student.previousMentor
        })

    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
}
export default {
    getAllStudent,
    createStudents,
    studentWithoutMentor,
    assignStudentsToMentor,
    oneMentorToManyStudent,
    changeMentorForPaticularStudent,
    StudentForParticularMentor,
    previousMentorForParticularStudent
}