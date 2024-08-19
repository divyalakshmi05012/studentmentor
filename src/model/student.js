import mongoose from './index.js';
import { validateEmail } from '../common/validation.js';

const student = new mongoose.Schema({
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
    batch: {
        type: String,
        required: [true, "Batch is required"]
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    previousMentor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }]
}, {
    collection: 'student',
    versionKey: false
});

const studentModel = mongoose.model('Student', student);

export default studentModel;
