import { model, Schema } from 'mongoose';
const Tracks = [
    "Web Development", "Mobile Application","Analog Integrated Circuits",
    "Digital Integrated Circuits","Cyber Security","Embedded Systems",
    "Machine learning","Distribution","Industrial Automation","Industrial Advanced",
    "Renewable Energy","Control","Mechanical"
]
const partSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true ,min :11 , max : 11 },
    email: { type: String, required: true },
    university: { type: String, required: true },
    major: { type: String, required: true },
    academicYear: { type: String, required: true },
    preference: { type: String, enum: Tracks , required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
},{ timestamps: true , strictQuery:true });

export const Part = model('Part', partSchema);
