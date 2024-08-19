import {Router} from  'express'
import mentorRoutes from './mentorRoutes.js'
import studetRoutes from './studentRoutes.js'

const routes=Router()


routes.get('/',(req,res)=>{
    res.send("welcome")
})


routes.use('/mentor',mentorRoutes)
routes.use('/student',studetRoutes)



export default routes