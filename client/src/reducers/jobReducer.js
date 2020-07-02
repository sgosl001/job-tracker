import {
  GET_JOBS,
  ADD_JOB,
  DELETE_JOB,
  JOBS_LOADING,
  ADD_FAIL,
} from '../actions/types';

const initialState = {
  jobs: [],
  loading: false,
  isAdded: false,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload),
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
        isAdded: true,
      };
    case ADD_FAIL:
      return {
        ...state,
        isAdded: false,
      };
    case JOBS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default jobReducer;
