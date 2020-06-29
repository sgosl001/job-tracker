import { GET_JOBS, ADD_JOB, DELETE_JOB } from "./types";

export const getJobs = () => {
  return {
    type: GET_JOBS,
  };
};

export const addJob = job => {
  return {
    type: ADD_JOB,
    payload: job,
  };
};

export const deleteJob = id => {
  return {
    type: DELETE_JOB,
    payload: id,
  };
};
