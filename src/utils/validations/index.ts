import Joi from 'joi';

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';

export type FieldErrors = {
	[key: string]: string;
}

export type ResetValidateParams = {
	password: string;
	confirm_password: string;
}

const fieldsValidations = {
	username: Joi.string().min(5).required(),
	email: Joi.string().email({ tlds: { allow: false }}).required(),
	password: Joi.string().required(),
	confirm_password: Joi.string()
		.valid(Joi.ref('password'))
		.required()
		.messages({ 'any.only': 'confirm password does not match with password' }),
};

export function signUpValidate(values: UsersPermissionsRegisterInput) {
	const schema = Joi.object(fieldsValidations);

	return getFieldErrors(schema.validate(values));
}

export function signInValidate(values: Omit<UsersPermissionsRegisterInput, 'username'>) {
	const { email, password } = fieldsValidations;

	const schema = Joi.object({ email, password });

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

function getFieldErrors(objError: Joi.ValidationResult) {
	const errors: FieldErrors = {};

	if (objError.error) {
		objError.error.details.forEach((err) => {
			errors[err.path.join('.')] = err.message;
		});
	}

	return errors;
}

export function forgotValidate(values: Pick<UsersPermissionsRegisterInput, 'email'>) {
	const { email } = fieldsValidations;
	const schema = Joi.object({ email });

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}


export function resetValidate(values: ResetValidateParams) {
	const { password, confirm_password } = fieldsValidations;
	const schema = Joi.object({ password, confirm_password });

	return getFieldErrors(schema.validate(values, { abortEarly: false }));
}