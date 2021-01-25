const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const mongoose = require('mongoose');


describe('Middlware', () =>{
    let joe, blogPost;
    beforeEach((done) =>{
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'Js is Great', content:'yep it really is'});

        joe.blogPosts.push(blogPost);
        Promise.all([joe.save(), blogPost.save()])
            .then(() =>{
                done();
            });
    });
    it('Users clean up dangling blogposts on remove',(done) =>{
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
               assert(count === 0);
               done();
            });

    })

});