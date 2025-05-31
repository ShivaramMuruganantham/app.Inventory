export const FormValidate = {
    email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: [
        (v) => !!v || "Password is required",
        (v) => v && v.length >= 8 || "Password must be more than 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /[0-9]/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character",
    ],
};

export function FormValidateField(fieldName, value) {
    const rules = FormValidate[fieldName];
    if (!rules) return "";

    for (let rule of rules) {
        const error = rule(value);
        if (error !== true) return error;
    }

    return "";
}