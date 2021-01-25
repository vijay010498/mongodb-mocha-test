const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) =>{
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', (err) =>{
            console.warn('Warning', err);
        });
});


beforeEach((done) =>{
    const  users = mongoose.connection.collections.users;
    const comments = mongoose.connection.collections.comments;
    const blogposts = mongoose.connection.collections.blogposts;
    users.drop(() => {
        //Ready to run the next test!
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});