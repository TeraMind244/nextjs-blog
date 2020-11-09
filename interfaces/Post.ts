import { IMetadata } from "./Metadata";

export type IPostData = IMetadata & {
	slug: string;
	content: string;
};

interface IAllPostIdParam {
	params: {
		id: string
	};
}

export type AllPostIdParams = IAllPostIdParam[];
