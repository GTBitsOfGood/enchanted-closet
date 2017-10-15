// Action Creators

import * as types from './types';

export function toggleTitleState() {
	return {
		type: types.TOGGLE_TITLE_STATE,
	};
}

export function showLoader() {
	return {
		type: types.SHOW_LOADING_MODAL,
	};
}

export function hideLoader() {
	return {
		type: types.HIDE_LOADING_MODAL,
	};
}