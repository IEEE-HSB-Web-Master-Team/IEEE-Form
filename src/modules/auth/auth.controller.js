import { Auth } from "../../../DB/models/auth.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt  from "jsonwebtoken";
export const login  = asyncHandler(async (req, res, next) => {
    const { email , password  , role} = req.body
    const user  = await Auth.findOne({email})
    if(!user)return next(new Error("You are Not Allowed To Login", { cause:400 }));
    if(password !== user.password) return next(new Error("inValid Password", { cause: 400}));
     // generate token
  const token = jwt.sign({ email, id: user._id , role }, process.env.SECERT_KEY);
  // save token
  await Token.create({ token, user: user._id });
  res.json({ success: true, results: { token } });
});

export const create = asyncHandler(async (req, res, next) => {
  const {email} = req.body
  if(email !== "yousefsalah1242003@gmail.com")
    return next(new Error(" Not allowed "));
  const users = await Auth.find()
  if(users.length > 0) return next(new Error("Already Exist "));
    await Auth.insertMany([
      {
        email: "hr@ieee",
        password:"hr",
        role: "hr"
      },
      {
        email: "admin@ieee",
        password:"admin",
        role: "admin"
      }
    ]
    );
  return res.json({ success: true, message: "Created Successfully ✅" });
});
