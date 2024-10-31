import { Part } from "../../../DB/models/part.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { registerTemp } from "../../utils/htmlTamplates.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const register  = asyncHandler(async (req, res, next) => {
    const {email , preference} = req.body
    const part = await Part.findOne({email , preference})
    
    if(part)return next(new Error("You Have Register To This Track Before", { cause:400 }));
    await Part.create({...req.body})
      // send mail
  const html = registerTemp();
  const messageSent = sendEmail({
    to: req.body.email,
    subject: "IEEE Confirmation",
    html,
  });
  if (!messageSent) return next(new Error("Something Wrong! email not sent! "));
    return res.json({ success: true, message: "You Are Register Successfully ✅" });
});
export const updatePart = asyncHandler(async (req, res, next) => {
    const { status} = req.body
    const {id} = req.params

    const part = await Part.findOneAndUpdate({_id :id }, {status})
    if(!part) return next(new Error("Participant Not Found ", { cause:404 })); 
    return res.json({ success: true, message: "updated Successfully ✅" });
});
export const getAllParts  = asyncHandler(async (req, res, next) => {
    const parts = await Part.find()
    if(!parts) return next(new Error("there is no Participants", { cause:404 }));
    return res.json({ success: true, Participants:parts });
});
export const search = asyncHandler(async (req, res, next) => {
    const { name, email, phoneNumber ,track} = req.query;

    let parts;

    if (name) {
        parts = await Part.find({ name: { $regex: name, $options: "i" } });
        if (parts.length === 0) return next(new Error("There are no participants", { cause: 404 }));
        return res.json({ success: true, Participants: parts });
    }
    
    if (email) {
        parts = await Part.find({ email: { $regex: email, $options: "i" } });
        if (parts.length === 0) return next(new Error("There are no participants", { cause: 404 }));
        return res.json({ success: true, Participants: parts });
    }
    
    if (phoneNumber) {
        parts = await Part.find({ phoneNumber: { $regex: phoneNumber, $options: "i" } });
        if (parts.length === 0) return next(new Error("There are no participants", { cause: 404 }));
        return res.json({ success: true, Participants: parts });
    }
    if(track){
        parts = await Part.find({ preference: { $regex: track, $options: "i" } });
        if (parts.length === 0) return next(new Error("There are no participants", { cause: 404 }));
        return res.json({ success: true, Participants: parts });

    }

    return next(new Error("There are no participants", { cause: 404 }));
});
export const deletePart = asyncHandler(async (req, res, next) => {
    const {id} = req.params

    const part = await Part.findOneAndDelete({_id :id })
    if(!part) return next(new Error("Participant Not Found ", { cause:404 })); 
    return res.json({ success: true, message: "deleted Successfully ✅" });
});