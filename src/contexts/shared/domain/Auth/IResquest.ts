import { Request, Response } from 'express';
import { UserJsonDocument } from '../../../WorkProgretion/Users/domain/Types/UserJsonDocument';

export interface RequestTokenized extends Request {
	user: UserJsonDocument;
}

export interface RequestContext {
	req: RequestTokenized;
	res: Response;
}
