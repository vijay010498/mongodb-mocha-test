const assert  = require('assert');
const User = require('../src/user');

describe('Deleting a user', () =>{
    let joe;
    beforeEach((done) =>{
       joe = new User({name: 'Joe'});
       joe.save()
           .then(() => {
               done();
           });
    });

    it('Model instance remove', (done) =>{
        joe.remove()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                if(user === null){
                    assert(user === null);
                    done();
                }
            });

    });
    it('class method remove', (done) =>{
        //Remove a bunch of records
        //User
        User.remove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                if(user === null){
                    assert(user === null);
                    done();
                }
            });

    });
    it('Model method findAndRemove', (done) =>{
        //User
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                if(user === null){
                    assert(user === null);
                    done();
                }
            });
    });
    it('Model method findByIdAndRemove', (done) =>{
        //User
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                if(user === null){
                    assert(user === null);
                    done();
                }
            });

    });

});