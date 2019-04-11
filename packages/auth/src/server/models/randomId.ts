import {randomBytes, pseudoRandomBytes} from 'crypto';

export default function randomId(digits = 24): string {
	const numBytes = Math.ceil(digits / 2);
	let bytes;
	try {
		bytes = randomBytes(numBytes);
	} catch (e) {
		bytes = pseudoRandomBytes(numBytes);
	}
	return bytes.toString('hex').substring(0, digits);
}
