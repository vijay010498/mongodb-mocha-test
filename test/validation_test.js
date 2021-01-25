const assert = require('assert');
const User = require('../src/user')

describe('Validating Record', () =>{
    it('Requires a user name', () =>{
        const user = new User({name: undefined});
        const validationResult = user.validateSync(); //synchronous validation process //validate - does not return value
        const message = validationResult.errors.name.message;

        assert(message === 'Name is required.');

    });

    it('Requires a user\'s name longer than 2 chars',() =>{
        const  user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from being saved', (done) =>{
       const user = new User({name: 'Al'});
       user.save()
           .catch((validationResult) =>{
               const message = validationResult.errors.name.message;

               assert(message === 'Name must be longer than 2 characters.');
               done();
           });
    });

});