import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = (action) => {
  console.info(action);

  AppDispatcher.dispatch({ action });
};

export default AppDispatcher;
