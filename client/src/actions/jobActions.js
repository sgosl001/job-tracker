import axios from 'axios';
import { GET_JOBS, ADD_JOB, DELETE_JOB, JOBS_LOADING, ADD_FAIL } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getJobs = (limit, skip, search) => (dispatch, getState) => {
  dispatch(setJobsLoading());

  search !== null || search !== ''
    ? axios
        .get(
          `/api/jobs?search=${search}&limit=${limit}&skip=${skip}`,
          tokenConfig(getState)
        )
        .then(res =>
          dispatch({
            type: GET_JOBS,
            payload: res.data,
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        )
    : axios
        .get(`/api/jobs?limit=${limit}&skip=${skip}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: GET_JOBS,
            payload: res.data,
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addJob = job => (dispatch, getState) => {
  axios
    .post('/api/jobs', job, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_JOB,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_FAIL')
      );
      dispatch({ type: ADD_FAIL });
    });
};

export const deleteJob = id => (dispatch, getState) => {
  axios
    .delete(`/api/jobs/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_JOB,
        payload: id,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setJobsLoading = () => {
  return {
    type: JOBS_LOADING,
  };
};
