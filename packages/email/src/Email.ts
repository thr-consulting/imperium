/* eslint-disable no-console */
import debug from 'debug';
import {Transporter} from 'nodemailer';
import striptags from 'striptags';
import Stream from 'stream';
import markdownIt from 'markdown-it';
import isUndefined from 'lodash/isUndefined';
import htmlToText from 'html-to-text';
import mjml2html from 'mjml';

const d = debug('imperium.email.Email');

const md = markdownIt();

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
	markdown?: boolean,
}

interface SendHtmlOptions {
	from: string,
	to: string,
	subject: string,
	html: string,
	attachments?: [{
		filename: string,
		context: string | Buffer | Stream,
	}],
	debug: null | {
		to: string | null,
	},
}

export default class Email {
	transporter: Transporter;

	constructor(transporter) {
		if (!transporter) throw new Error('Email transporter not defined');
		this.transporter = transporter;
	}

	async send({from, to, body, subject, template, attachments, markdown}: SendOptions) {
		const isMarkdown = isUndefined(markdown) ? true : markdown;
		const mSubject = striptags(subject);
		const mBody = striptags(body);
		const templateParams = {
			mail: {
				subject: mSubject,
				body: isMarkdown ? md.render(mBody) : mBody,
			},
		};

		if (process.env.IMPERIUM_NODE_ENV === 'production') {
			await this.transporter.sendMail({
				from,
				to: process.env.MAIL_TO_DEVOVERRIDE ? process.env.MAIL_TO_DEVOVERRIDE : to,
				subject: mSubject,
				text: mBody,
				html: template ? template(templateParams) : templateParams.mail.body,
				attachments,
			});
		} else {
			console.log('--------- DEV MODE: SENDING EMAIL  -------------------');
			console.log(`  From         : ${from}`);
			console.log(`  To           : ${to}`);
			console.log(`  Subject      : ${mSubject}`);
			console.log(`  HTML Template: ${!!template}`);
			console.log(`  Markdown Body: ${isMarkdown}`);
			// console.log(mBody);
			if (attachments) {
				attachments.forEach(att => {
					console.log(`  Attached file: ${att.filename}`);
				});
			}
			console.log('------------------------------------------------------');
		}
	}

	async sendHtml({from, to, html, subject, attachments, debug}: SendHtmlOptions) {
		const mSubject = striptags(subject);

		if (process.env.IMPERIUM_NODE_ENV === 'production') {
			return await this.transporter.sendMail({
				from,
				to: debug && debug.to ? debug.to : to,
				subject: mSubject,
				text: htmlToText.fromString(html),
				html,
				attachments,
			});
		} else {
			console.log('--------- DEV MODE: SENDING EMAIL  -------------------');
			console.log(`  From         : ${from}`);
			console.log(`  To           : ${to}`);
			console.log(`  Subject      : ${mSubject}`);
			if (attachments) {
				attachments.forEach(att => {
					console.log(`  Attached file: ${att.filename}`);
				});
			}
			console.log('------------------------------------------------------');
			return Promise.resolve();
		}
	}

	async sendMjml({from, to, mjml, subject, attachments, debug}) {
		return await this.sendHtml({from, to, html: mjml2html(mjml).html, subject, attachments, debug});
	}
}
