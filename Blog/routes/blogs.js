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
		author: req.body.author,
		// rating: req.body.rating
		rating: 0
	}, function(err,blogs){
		if (err) throw err;
		res.json(blogs)
	});
});

//returns the blog corresponding to the id
router.get('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.findOne({ _id: req.params.id }, function(err,blog){
		if (err) throw err;
		res.json(blog)
	});
});

//add new blog-post to one of the blog
router.post('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.update({ _id : req.params.id }, 
	{
		// rating: req.body.rating,
		$addToSet:{
		post: {
			$each:[{
				postid: req.body.postid,
				date: req.body.date,
				heading: req.body.heading,
				body: req.body.body
				}]
			}
		}
	}, function(err,blogs){
		if (err) throw err;
		res.json(blogs)
	});
});

//delete blog from the database
router.delete('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.remove({
		_id: req.params.id
	}, function(err,blog){
		if (err) throw err;
		res.json(blog);
	});
});

//delete the blog-post from the database
router.delete('/:id/:postid', function(req,res){
	var collection = db.get('blogs');
	collection.update({
		_id: req.params.id
	}, {$pull: {'post': {postid: req.params.postid}}
	}, function(err,blog){
		if (err) throw err;
		res.json(blog);
	});
});

// db.blogs.update({ _id: ObjectId("58f73bf51a19a6402541eb11")}, 
// 	{$pull: {post: { postid: 1}}}
// 	)
//retrieve user rating of the blog
router.put('/:id', function(req,res){
	var collection = db.get('blogs');
	collection.update({ _id: req.params.id
	}, {
		$set: {
			rating: req.params.rating
		}
	}, function(err,blog){
		if (err) throw err;
		res.json(blog);
	});	//needs to calculate the average
});
module.exports = router;