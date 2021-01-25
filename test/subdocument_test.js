const assert = require('assert')
const User = require('../src/user');

describe('Subdocuments', () =>{
   it('can Create a sub document', (done) =>{
       const joe  = new User({
           name:'Joe',
           posts: [{title: 'PostTitle'}]
       });

       joe.save()
           .then(() =>{
               User.findOne({name: 'Joe'})
                   .then((user) =>{
                      assert(user.posts[0].title === 'PostTitle');
                      done();
                   });
           });
   });

   it('Can add subdocuments to an existing record', (done) =>{
       const joe = new User({
          name: 'Joe',
          posts: [] //only for understanding default only true
       });

       joe.save()
           .then( () => User.findOne({name: 'Joe'}))
           .then((user) => {
               user.posts.push({ title: 'New Post' });
               return user.save();
           })
           .then(() => User.findOne({ name: 'Joe' }))
           .then((user) => {
               console.log(user);
              assert(user.posts[0].title === 'New Post');
              done();
           });

   });

   it('can remove existing sub documents', (done) =>{
       const joe = new User({
           name: 'Joe',
           posts: [{title: 'New Title'}] //only for understanding default only true
       });

       joe.save()
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) =>{
              user.posts[0].remove() ;
              return user.save();
           })
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) =>{
              assert(user.posts.length === 0);
              done();
           });


   })
});