import * as yup from 'yup';



const userProfileSchema = yup.object().shape({
    username: yup
        .string()
        .required("Enter a new username"),
    password: yup
        .string()
        .required("What is your current password"),
    password2: yup
        .string()
        .optional()
})

export default userProfileSchema;