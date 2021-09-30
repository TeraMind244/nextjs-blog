import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory("BLOG");

export namespace BlogActions {
	export const clear = actionCreator("CLEAR");

	export const setTitle = actionCreator<string>("SET_TITLE");

	export const setContent = actionCreator<string>("SET_CONTENT");
}
