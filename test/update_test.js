const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () =>{
    let joe;

    beforeEach((done) =>{
       joe = new User({name: 'Joe', likes: 0});
       joe.save()
           .then(() => {
               done();
           });
    });

    function  assertName(operation, done){
        operation
            .then(() => User.find({}))
            .then((users) =>{
                assert(users.length  === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('Model Instance type using  set n save', (done) =>{
        joe.set('name', 'Alex');
        assertName(joe.save(), done);

    });

    it('A model instance can update', (done) =>{
        assertName(joe.update({name: 'Alex'}), done);
    });

    it('A model call can update', (done) =>{
        assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);

    });

    it('A model call can update one record', (done) =>{
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),done);

    });

    it('A model call can update one record with an id and update', (done) =>{
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
    });

    //mangodb update operators
    it('A user can have their postCount increment by one', (done) =>{
        User.update({name: 'Joe'}, {$inc: {likes: 10}}) // -1 decrement
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                assert(user.likes === 10);
                done();
            });
    });



})