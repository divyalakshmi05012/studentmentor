import { Router } from "express";
import studentService from "../service/studentService.js";

const routes=Router()

routes.get('/',studentService.getAllStudent)
routes.post('/create',studentService.createStudents)
routes.get('/no-mentor',studentService.studentWithoutMentor)
routes.put('/mentor/:mentorId/student/:studentId',studentService. assignStudentsToMentor)
routes.put('/mentor/:mentorId',studentService.oneMentorToManyStudent)
routes.put('/mentor/:mentorId/:studentId',studentService.changeMentorForPaticularStudent)
routes.get('/mentor/:mentorId/student',studentService.StudentForParticularMentor)
routes.get('/:studentId/previous-mentor',studentService. previousMentorForParticularStudent)


export default routes