import { createContext, useReducer, useEffect } from "react";
import Reducer from './Reducers';

// 아래와 같이 해 주는 이유는 refresh했을 때, 해당 user information을 localstorage에서 가져와 다시 보여 준다.
// user: JSON.parse(localStorage.getItem("user")),
const INITIAL_STATE= {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // Managing user information in Localstorage
  // 아래와 같이 해 주는 이유는 해당 user의 session을 유지하기 위해...
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user])

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
}