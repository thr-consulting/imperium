import Email from './Email';

export {createTransport} from 'nodemailer';

export default function ImperiumEmailModule() {
	return {
		models: ({email}) => ({
			Email: new Email(email),
		}),
	};
}
