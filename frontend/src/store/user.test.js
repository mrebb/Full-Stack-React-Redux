import reducer, { addUser,addTestUser,fetchAllUsers} from './user';
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

describe('user state', () => {
   
  describe('user actions', () => {

    it('should create add action', () => {

      const user = {
        username: 'foo',
        password: 'bar',
        email:'foo@bar.com',
        isAuthenticated:false,
        redirect:false
      };

      const action = addUser(user);
      expect(action.type).toBe('User/ADD');
      expect(action.payload).toEqual(user);
    });
  });

  describe('user reducer', () => {

    it('should add to empty list', () => {

        const user = {
            username: 'foo',
            password: 'bar',
            email:'foo@bar.com',
            isAuthenticated:false,
            redirect:false
          };
      const action = addUser(user);

      const state = reducer([], action);

      expect(state.length).toBe(1);

      expect(state[0].username).toBe(user.username);

      expect(state[0].password).toBe(user.password);

      expect(state[0].email).toBe(user.email);

    });
    it('util methods test: should add to existing list', (done) => {
        
        const firstUser = {
            username: 'madhu',
            password: 'madhu',
            email:'madhu@foo.com',
            isAuthenticated:false,
            redirect:false
          };
        const newUser = {
            username: 'foo',
            password: 'bar',
            email:'foo@bar.com',
            isAuthenticated:false,
            redirect:false
          };
          //Beforeall & afterall didn't work to drop the collection, so this is an alternative
          MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db('cookies-lab');
            var query = { username: "madhu" };
            try{
             dbo.collection("users").findOneAndDelete(query)
             return addTestUser(firstUser)
        .then(token=>{
          console.log(token)
         fetchAllUsers().then(
        response=>{
            let initialState = response;
            const action = addUser(newUser);

      const state = reducer(initialState, action);

      expect(state.length).toBe(2);

      expect(state[1].username).toBe(newUser.username);

      expect(state[1].password).toBe(newUser.password);

      expect(state[1].email).toBe(newUser.email);
        done();
    }
       )
    })
            }
            catch(e){
                print(e);
             }
          });
        
    });
    
  });
});