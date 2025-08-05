import authReducer from './auth';
import globalReducer from './global';
import notificationReducer from './notification';
import stationReducer from './station';
import kafkaReducer from './kafka';
import monitoringStationReducer from './monitoring-station';

const appReducers = {
  authSlice: authReducer,
  globalSlice: globalReducer,
  notificationSlice: notificationReducer,
  stationSlice: stationReducer,
  kafkaSlice: kafkaReducer,
  monitoringStationSlice: monitoringStationReducer,
};

export default appReducers;
