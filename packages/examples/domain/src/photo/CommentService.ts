import {AbstractEntityService} from '~lib/AbstractEntityService';
import type {DomainConnectors} from '../core/DomainConnectors';
import type {Comment} from './Comment';

export class CommentService extends AbstractEntityService<Comment, DomainConnectors> {}
