import { Action } from "typescript-fsa";
import { BlogActions } from "./actions";

export interface IStateProps {
	title: string;
	content: string;
}

interface IActionMap {
	[type: string]: (state: IStateProps, action?: Action<any>) => IStateProps;
}

export const INITIAL_STATE: IStateProps = {
	title: "",
	content: ""
};

const ACTION_MAP: IActionMap = {
	[BlogActions.clear.type]: clear,
	[BlogActions.setTitle.type]: setTitle,
	[BlogActions.setContent.type]: setContent
};

export namespace BlogReducers {
	export const reduceBlog = (state = INITIAL_STATE, action: Action<any>): IStateProps => {
		return ACTION_MAP[action.type]?.(state, action) || state;
	};
}

function clear(): IStateProps {
	return {
		...INITIAL_STATE
	};
}

function setTitle(state: IStateProps, action: Action<string>) {
	return {
		...state,
		title: action.payload
	};
}

function setContent(state: IStateProps, action: Action<string>) {
	return {
		...state,
		content: action.payload
	};
}
