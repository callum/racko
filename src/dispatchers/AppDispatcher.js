import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = (action) => {
  AppDispatcher.dispatch({ action });
};

export default AppDispatcher;
