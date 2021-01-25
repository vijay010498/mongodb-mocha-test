const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () =>{
    let joe, blogPost, comment;
    beforeEach((done) =>{
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'Js is Great', content:'yep it really is'});
        comment = new Comment({content: 'Congrats on great post'});


        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;



        /*joe.save();
        blogPost.save();
        comment.save();*/

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() =>{
                done();
            });
    });

    it('Saves a relation b/w a user and a blog  post', (done) =>{
        User.findOne({name: 'Joe'})
            .populate('blogPosts') //populate all the related blogPosts
            .then((user) =>{
                assert(user.blogPosts[0].title === 'Js is Great');
                done();
            })
    })

    it('Saves a full relation graph', (done) =>{
       User.findOne({name: 'Joe'})
           .populate({
               path: 'blogPosts',
               populate: {
                   path: 'comments',
                   model: 'comment',
                   populate: {
                       path: 'user',
                       model: 'user'
                   }
               }
           })
           .then((user) => {
              assert(user.name === 'Joe');
              assert(user.blogPosts[0].title === 'Js is Great');
              assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
               assert(user.blogPosts[0].comments[0].user.name === 'Joe');
              done();
    });
    });

});