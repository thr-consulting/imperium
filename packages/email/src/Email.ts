/* eslint-disable no-console */
import debug from 'debug';
import {Transporter} from 'nodemailer';
import striptags from 'striptags';
import Stream from 'stream';

const d = debug('imperium.email.Email');

interface SendOptions {
	from: string,
	to: string,
	subject: string,
	body: string,
	template?: (params: Record<string, any>) => string,
	attachments?: [{
		filename: string,
		context: string | Buffer | Stream,
	}],
}

export default class Email {
	transporter: Transporter;

	constructor(transporter) {
		if (!transporter) throw new Error('Email transporter not defined');
		this.transporter = transporter;
	}

	async send({from, to, body, subject, template, attachments}: SendOptions) {
		const templateParams = {
			mail: {
				subject,
				title: subject,
				body,
			},
		};

		if (process.env.IMPERIUM_NODE_ENV === 'production') {
			await this.transporter.sendMail({
				from,
				to: process.env.MAIL_TO_DEVOVERRIDE ? process.env.MAIL_TO_DEVOVERRIDE : to,
				subject,
				text: striptags(body),
				html: template ? template(templateParams) : body,
				attachments,
			});
		} else {
			console.log('--------- DEV MODE: SENDING EMAIL  -------------------');
			console.log(`  From   : ${from}`);
			console.log(`  To     : ${to}`);
			console.log(`  Subject: ${subject}`);
			console.log(striptags(body));
			if (template) {
				console.log('-------------------------');
				console.log(template(templateParams));
			}
			if (attachments) {
				attachments.forEach(att => {
					console.log(`  Attached file: ${att.filename}`);
				});
			}
			console.log('------------------------------------------------------');
		}
	}
}
