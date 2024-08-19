import mentorModel from "../model/mentor.js";


const getAllMentors = async (req, res) => {
    try {

        const mentors = await mentorModel.find()
        res.status(200).send({
            message: "Data Fetch Successfull",
            data: mentors
        })

    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}


const createMentors = async(req, res)=> {
    try {

        let {name, email, subject}= req.body

        if(!name || !email || !subject){
            return res.status(400).send({
                message: "All fields (name, email, subject) are required"
            })
        }

        let exsisitingMentor= await mentorModel.findOne({name})

        if(exsisitingMentor){
            return res.status(409).send({
                message:"Mentor With The Name Already Exist"
            })
        }
        await  mentorModel.create({
            name,
            email,
            subject
        })

        res.status(201).send({
            message:"mentor created successfully"
        })
    }
    catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

export default {
    getAllMentors,
    createMentors
}