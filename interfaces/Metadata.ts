export interface IMetadata {
	title: string;
	date: number;
}

export type Metadata = {
	[slug: string]: IMetadata;
}
