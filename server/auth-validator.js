const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(3, { message: "Email most be at least of 3 charecters" })
    .max(255, { message: "Email most not be more then 255 charecters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password most be at least of 7 charecters" })
    .max(255, { message: "Password most not be more then 255 charecters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name most be at least of 3 charecters" })
    .max(255, { message: "Name most not be more then 255 charecters"}),
  phone: z
    .string({ required_error: "Phone No. is required" })
    .trim()
    .min(10, { message: "Phone most be at least of 10 charecters" })
    .max(20, { message: "Phone most not be more then 20 charecters"}),
});

module.exports = {signupSchema, loginSchema};