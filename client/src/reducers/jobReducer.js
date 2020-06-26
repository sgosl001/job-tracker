import { v4 as uuid } from "uuid";
import { GET_JOBS, ADD_JOB, DELETE_JOB } from "../actions/types";

const initialState = {
  jobs: [
    {
      id: uuid(),
      company: "sumsing",
      position: "sumppos",
      link: "peepee.com",
    },

    {
      id: uuid(),
      company: "wee",
      position: "twolow",
      link: "peepoo.com",
    },
  ],
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload),
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
      };
    default:
      return state;
  }
};

export default jobReducer;
