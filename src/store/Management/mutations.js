export default {
  SEND_MESSAGE: (state, token) => {
    state.token = token;
  },
  CHECK_OUT: (state, message) => {
    state.message = message.data.message;
  },
  CLEAR_MESSAGE: state => {
    state.message = "";
  },
  VIEW_ACCOMMODATIONS: (state, accommodations) => {
    state.accommodations = accommodations;
  },
  SINGLE_ACCOMMODATION_VIEW: (state, accommodation) => {
    state.accommodation = accommodation;
  },
  RETURN_ASSET: (state, message) => {
    state.message = message;
  },
  CLEAN_MESSAGE: state => {
    state.message = null;
  },
  CLEAR_TOKEN: state => {
    state.token = null;
  }
};
