import mongoose from './index.js';
import { validateEmail } from '../common/validation.js';

const mentor = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]

}, {
    collection: 'mentor',
    versionKey: false
});

const mentorModel = mongoose.model('Mentor', mentor);

export default mentorModel;
