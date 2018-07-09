import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as fromAuth from './auth.reducer';

export interface AuthState {
    user: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthState> = {
    user: fromAuth.reducer
};

export interface State extends fromRoot.State {
    auth: AuthState;
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
    getAuthState,
    (state: AuthState) => state.user
);

export const getUserProfile = createSelector(
    getUser,
    fromAuth.getProfile
);

export const getAuthLoading = createSelector(
    getUser,
    fromAuth.getLoading
);

export const getAuthError = createSelector(
    getUser,
    fromAuth.getError
);