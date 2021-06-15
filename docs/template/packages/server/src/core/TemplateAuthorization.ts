import {Authorization} from '@imperium/authorization';
import type {User} from '../user/entities';

export class TemplateAuthorization extends Authorization<User> {}
