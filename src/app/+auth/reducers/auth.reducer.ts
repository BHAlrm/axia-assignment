import { AuthActions, AuthActionTypes } from '../actions';
import { ProfileModel } from '../models/profile.model';

export interface State {
  profile: ProfileModel;
  loading: boolean;
  error: string;
}

const initialState: State = {
  profile: null,
  loading: false,
  error: null
};

export function reducer(state = initialState,
                        action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.GetProfile: {
      return { ...state, loading: true };
    }

    case AuthActionTypes.Authenticated: {
      return { ...state, profile: action.payload, loading: false };
    }

    case AuthActionTypes.NotAuthenticated: {
      return { ...initialState };
    }

    case AuthActionTypes.EmailSignIn: {
      return { ...state, loading: true, error: null };
    }

    case AuthActionTypes.AuthError: {
      return { ...state, error: action.payload.error, loading: false };
    }

    case AuthActionTypes.SignOut: {
      return { ...state, loading: true };
    }

    case AuthActionTypes.RootRedirect:
    case AuthActionTypes.SignInRedirect: {
      return { ...state, loading: false, error: null };
    }

    default: {
      return {
        ...state
      };
    }
  }
}

export const getProfile = (state: State) => state.profile;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;