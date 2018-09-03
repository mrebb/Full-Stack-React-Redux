import superagent from 'superagent'
// Actions
const ADD = 'User/ADD';
let defaultState =[];
// Reducer
export default function reducer(state = defaultState, action) {

  const { type, payload } = action;

  switch (type) {
    case ADD:
      return [
        ...state,
        payload
      ];
      
    default: return state;
  }
}
// Action Creators
export function addUser(user) {
  return {
    type: ADD,
    payload: user
  }  
}

//Utils
export function addUserAsync(user) {

  return dispatch => {
    return superagent.post('http://localhost:5000/signup')
    .send(user)
    .then(response=>{
        dispatch(addUser(user));
        return response.text;
    })
  };
}
//Utils for test cases
export function addTestUser(user) {
    return superagent.post('http://localhost:5000/signup')
      .send(user)
      .then(response=>{
          return response.text;
      })
  }
  export function deleteUsers() {
    return superagent.delete('http://localhost:5000/users')
      .then(response=>{
          return response.text;
      })
  }
export function fetchUserAsync(user) {
    return ()=> {
      return superagent.get('http://localhost:5000/login')
      .auth(user.username,user.password)
      .then(response=>{
          return response.text;  
      })  
    };
  }
  export function fetchAllUsers(){
      return  superagent.get('http://localhost:5000/users')
      .then(response=>{
          let users = JSON.parse(response.text)
           defaultState = users;  
           return users;
      })
  }