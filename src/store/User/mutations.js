export default {
  SEND_MESSAGE: (state, message) => {
    state.message = message;
  },
  VIEW_USERS: (state, users) => {
    state.users = users;
  },
  VIEW_USER: (state, user) => {
    state.user = user;
  },
  LOGIN: (state, token) => {
    state.token = token;
  },
  LOGOUT: state => {
    state.token = localStorage.getItem("user");
  },
  COUNTER: state => {
    state.counter = state.counter + 1;
  },
  TRASH: (state, trash) => {
    state.trash = trash;
  }
};
