const RESET_ERROR = "RESET_ERROR";

interface errorAction {
  type: string;
  error: string | object;
}

type errorActionTypes = errorAction;

export const resetError = () => ({
  type: RESET_ERROR,
});

export const error = (state = null, action: errorActionTypes) => {
  const { error } = action;

  if (action.type === RESET_ERROR) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};
