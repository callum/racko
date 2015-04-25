import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

  handleAction(action) {
    this.dispatch({ action });
  }

}

export default new AppDispatcher();
