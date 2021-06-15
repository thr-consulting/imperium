import {AbstractController} from '@imperium/domaindriven';
import type {User} from '../user/entities';

export abstract class TemplateController<Repositories> extends AbstractController<Repositories, User> {}
