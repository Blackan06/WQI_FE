import authReducer from './auth';
import globalReducer from './global';
import notificationReducer from './notification';

const appReducers = {
  authSlice: authReducer,
  globalSlice: globalReducer,
  notificationSlice: notificationReducer,
};

export default appReducers;
