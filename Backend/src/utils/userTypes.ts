import z from "zod"

export const signupSchema = z.object({
    email: z.string().min(3).max(50),
    name: z.string().min(3).max(50),
    password: z.string().min(4).max(16)
})

export const loginSchema = z.object({
    email: z.string().min(3).max(50),
    password: z.string().min(4).max(16)
})
