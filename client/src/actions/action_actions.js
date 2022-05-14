import axios from 'axios';
import parseISO from 'date-fns/parseISO';
import { toastr } from 'react-redux-toastr';
import {
  ACTION_ACTION_ERROR,
  ACTION_ACTION_START,
  ACTION_ADD_SUCCESS,
  ACTION_DELETE_SUCCESS,
  ACTION_EDIT_SUCCESS,
  ACTION_LOAD_SUCCESS,
  TODAYACTION_LOAD_SUCCESS,
} from './actionsTypes';
import { configHeaders } from './config';

export const addAction = data => {
  return async dispatch => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      await axios.post('/api/action/add', data, configHeaders());
      dispatch({ type: ACTION_ADD_SUCCESS });
      toastr.success('Success', ' A new action is created');
      loadActions(data.fieldId);
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
      toastr.error('Error', 'action is not created');
    }
  };
};

export const loadActions = fieldId => {
  return async dispatch => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      const { data } = await axios.get(
        `/api/action/${fieldId}`,
        configHeaders()
      );
      for (var i in data) {
        data[i].startDate = parseISO(data[i].startDate);
        data[i].endDate = parseISO(data[i].endDate);
      }
      dispatch({ type: ACTION_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
    }
  };
};

export const editAction = data => {
  return async dispatch => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      await axios.patch('/api/action/edit', data, configHeaders());
      dispatch({ type: ACTION_EDIT_SUCCESS });
      toastr.success('Success', 'Action is updated');
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
      toastr.error('Error', 'ACTION is not updated');
    }
  };
};

export const deleteAction = ACTIONId => {
  return async dispatch => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      await axios.delete(`/api/action/delete/${ACTIONId}`, configHeaders());
      dispatch({ type: ACTION_DELETE_SUCCESS });
      toastr.success('Success', 'Action is deleted');
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR });
      toastr.error('Error', 'Action is not deleted');
    }
  };
};

export const loadTodayActions = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      const { data } = await axios.get(
        '/api/action/all/today',
        configHeaders()
      );
      for (var i in data) {
        data[i].startDate = parseISO(data[i].startDate);
        data[i].endDate = parseISO(data[i].endDate);
      }

      dispatch({ type: TODAYACTION_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
    }
  };
};
