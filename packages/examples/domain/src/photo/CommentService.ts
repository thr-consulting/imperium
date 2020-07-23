import {AbstractEntityService} from '../AbstractEntityService';
import type {DomainConnectors} from '../DomainConnectors';
import type {Comment} from './Comment';

export class CommentService extends AbstractEntityService<Comment, DomainConnectors> {}
