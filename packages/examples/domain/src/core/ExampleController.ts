import {AbstractController} from '@imperium/domaindriven';
import type {User} from '../user/entities/User';

export class ExampleController<Repo> extends AbstractController<Repo, User> {}
