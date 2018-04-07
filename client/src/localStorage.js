// Persist State
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    // Ignore write errors
    console.log(error);
  }
};

// Auth Token
export const getAuthToken = () => {
  try {
    localStorage.getItem('authToken');
    if (localStorage === null) {
      return undefined;
    }
    return localStorage;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const saveAuthToken = (token) => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.log(error);
  }
}

export const removeAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.log(error);
  }
}