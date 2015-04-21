import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  GAME_CREATE: null,
  GAME_START: null,
  GAME_END: null,
  GAME_END_TURN: null,
  GAME_RECEIVE: null
});

export const States = keyMirror({
  CREATED: null,
  STARTED: null,
  ENDED: null
});
