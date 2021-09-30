import { ParsedUrlQuery } from "querystring";
import { IMetadata } from "./Metadata";

export type IPostData = IMetadata & {
	slug: string;
	content: string;
};

interface IAllPostIdParam {
	params: IPostId;
}

export interface IPostId extends ParsedUrlQuery {
	id: string;
}

export type AllPostIdParams = IAllPostIdParam[];
