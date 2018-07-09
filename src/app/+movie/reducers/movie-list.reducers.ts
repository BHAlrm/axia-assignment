import { MovieActions, MovieActionTypes } from '../actions';

export interface State {
  data: any;
  loading: boolean;
  error: string;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null
};

export function reducer(state = initialState,
                        action: MovieActions) {
  switch (action.type) {
    case MovieActionTypes.Get: {
      return { ...state, loading: true };
    }

    case MovieActionTypes.GetSuccess: {
      return { ...state, data: action.payload, loading: false, error: null };
    }

    case MovieActionTypes.GetFail: {
      return { ...state, error: action.payload.error, loading: false };
    }

    case MovieActionTypes.Delete: {
      return { ...state, loading: true };
    }

    case MovieActionTypes.DeleteSuccess: {
      return { ...state, loading: false, error: null };
    }

    case MovieActionTypes.DeleteFail: {
      return { ...state, loading: false, error: action.payload.error };
    }

    default: {
      return {
        ...state
      };
    }
  }
}

export const getMovieList = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;