import { model, Schema } from 'mongoose';

const authSchema = new Schema({
    email:{
        type : String ,
        unqiue : true ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    role : {
        type : String , 
        default : "hr"
    }

},{ timestamps: true });

export const Auth = model('Auth', authSchema);
