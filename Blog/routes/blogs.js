var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/blogs');

//return list of blogs
router.get('/', function(req,res){
	var collection = db.get('blogs');
	collection.find({}, function(err, blogs){
		if(err) throw err;
		res.json(blogs);
	});
});

//add new blog
router.post('/', function(req,res){
	var collection = db.get('blogs');
	collection.insert({
		title: req.body.title,
		author: req.body.author
	}, function(err,movie){
		if (err) throw err;
		res.json(blog)
	});
});

//returns the blog corresponding to the id
router.get('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.findOne({
		_id: req.params.id
	}, function(err,movie){
		if (err) throw err;
		res.json(blog)
	});
});

//add new blog-post to one of the blog
router.post('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.update({ _id : ObjectId("':id'")}, 
	{
		$addToSet:{
		posts: {
			$each:[{
				postid: req.body.postid,
				date: req.body.date,
				heading: req.body.heading9,
				body: req.body.body
				}]
			}
		}
	}, function(err,movie){
		if (err) throw err;
		res.json(blog)
	});
});
db.blogs.update({ _id: ObjectId("58f28169c6fc2553477e6824") }, { $addToSet: {posts: { $each: [{ postid: 4, date: "April 14, 2017", heading: "Babi", body: "babiii"}]}}})
//delete blog from the database
router.delete('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.remove({
		_id: req.params.id
	}, function(err,movie){
		if (err) throw err;
		res.json(blog);
	});
});

//delete the blog-post from the database
router.delete('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.remove({
		_id: req.params.id
	}, function(err,movie){
		if (err) throw err;
		res.json(blog);
	});
});


//retrieve user rating of the blog
router.put('', function(req,res){
	var collection = db.get('blogs');
	//needs to calculate the average
})
module.exports = router;