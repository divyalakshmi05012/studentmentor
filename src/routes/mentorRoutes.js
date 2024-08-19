import { Router } from "express";
import mentorService from "../service/mentorService.js"

const routes=Router()

routes.get('/',mentorService.getAllMentors)
routes.post('/create',mentorService.createMentors)

export default routes