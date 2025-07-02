export const FormValidate = {
    name : [
        (v) => !!v || "Name is required",
        (v) => v && v.length >= 3 && v.length <= 20 || "Name must be more than 3 characters and less than 20 characters",
        (v) => /^[a-zA-Z\s]+$/.test(v) || "Name must contain only letters and spaces"
    ],
    phone:[
        (v) => !!v || "Phone number is required",
        (v) => v && v.length === 10 || "Phone number must be 10 digits",
        (v) => /^[0-9]+$/.test(v) || "Phone number must contain only digits"
    ],
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
        (v) => /[!@#$%^&_*]/.test(v) || "Password must contain at least one special character",
    ],
};

export function LoginValidate(fieldName, value) {
    const rules = FormValidate[fieldName];
    if (!rules) return "";

    for (let rule of rules) {
        const error = rule(value);
        if (error !== true) return error;
    }

    return "";
}

export function RegisterValidate(fieldName, value) {
    const rules = FormValidate[fieldName];
    if (!rules) return "";

    for (let rule of rules) {
        const error = rule(value);
        if (error !== true) return error;
    }

    return "";
}
