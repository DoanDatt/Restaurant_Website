import z from 'zod'

export const userSignupSchema = z.object({
  fullname: z.string().min(1, 'Fullname is required'),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, 'Password is must be at least 6 character'),
  contact: z.string().min(10, 'Contact number must be at least 10 character')
})

export type SignUpInputState = z.infer<typeof userSignupSchema>

export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, 'Password is must be at least 6 character')
})

export type LoginInputState = z.infer<typeof userLoginSchema>
