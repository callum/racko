import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  GAME_CREATE: null,
  GAME_START: null,
  GAME_END: null,
  GAME_JOIN: null,
  GAME_END_TURN: null,
  GAME_RECEIVE: null
});

export const States = {
  GAME_CREATED: 'created',
  GAME_STARTED: 'started',
  GAME_ENDED: 'ended'
};
