import superagent from 'superagent';
// Actions
const TOKEN_SET = 'Auth/TOKEN_SET';

// Reducer
export default function reducer(state = '', action) {

  const { type, payload } = action;

  switch (type) {
  case TOKEN_SET:
    return payload;
  default: return state;
  }
}
// Action Creators

export const tokenSet= token =>({
  
  type: TOKEN_SET,
  payload: token,
  
});
//Utils

export function login(user) {
  return (dispatch)=> {
    return superagent.get('http://localhost:5000/login')
      .auth(user.username,user.password)
      .then(response=>{
        let token = response.text;
        dispatch(tokenSet(token));
        return response.text;  
      });  
  };
}
  