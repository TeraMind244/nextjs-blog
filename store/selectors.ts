import { IStateProps } from "./reducers";

export namespace BlogSelectors {
	export const title = (state: IStateProps): string => state.title;

	export const content = (state: IStateProps): string => state.content;
}
