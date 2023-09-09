import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email().nonempty({ message: 'please enter valid email' }),
  password: z.string().nonempty({ message: 'please enter your password' }),
});

export type UserCreateSchemaZ = z.infer<typeof userCreateSchema>;

export const userZ = z.object({
  email: z.string().email(),
  id: z.string().uuid(),
});
export type UserZ = z.infer<typeof userZ>;

export const userLoginPayloadZ = z.object({
  access_token: z.string().nonempty(),
  user: userZ,
});

export type UserLoginPayloadZ = z.infer<typeof userLoginPayloadZ>;

export const adminUserCreateSchema = z
  .object({
    confirmPassword: z
      .string()
      .nonempty({ message: 'please enter your confirm password' }),
    email: z.string().email().nonempty({ message: 'please enter valid email' }),
    password: z.string().nonempty({ message: 'please enter your password' }),
    user_type: z.string().nonempty({ message: 'please select user type' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type AdminUserCreateSchemaZ = z.infer<typeof adminUserCreateSchema>;

export const resetPasswordSchema = z
  .object({
    confirmPassword: z
      .string()
      .nonempty({ message: 'please enter your confirm password' }),
    password: z.string().nonempty({ message: 'please enter your password' }),
    oldPassword: z.string().nonempty({ message: 'please select user type' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine((data) => data.oldPassword !== data.password, {
    message: "can't use old password as new password",
    path: ['password'],
  });

export type ResetPasswordSchemaZ = z.infer<typeof resetPasswordSchema>;
