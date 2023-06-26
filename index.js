

const express = require('express');

const pNum= 5555;

const db = require('./config/mongoose.js');
const Contact = require('./Models/contact');

const weg = require('path');

const app = express();


var contactList =[
	{name: 'Avinash', 
	phone: 111111},
	{name:'Inder',
	phone: 213456},
	{name: 'Kumar',
	phone: 9856789}

	];

app.set('view engine', 'ejs');
app.set('views', weg.join(__dirname,'view'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// Middle Ware 1
app.use(function(req, res, next){
	console.log('Middle ware 1');
	req.myName ='Avinash';
	next();
});

// Middle Ware 2

app.use(function(req, res, next){

	console.info('From Middle Ware 2', req.myName);
	next();
});

app.get('/',function(req,res){

	console.log('From Home Page Controller ', req.myName );

	// Contact.find({name:"New"}, function(err, contact){

	// 	if(err){
	// 		console.log('Error in fetching data from Mongo DB');
	// 		return;
	// 	}
	// 	return res.render('ejsIndex', 
	// 	{
	// 		tit: "Aufenthalstitel-Deutschland",
	// 		contact_List: Contact
	// 	});

	//	});

	 Contact.find({name:"Sunday"}).then(function (contact) {
     // console.log(contact);
      return res.render('ejsIndex',{
            tit : "My contact list",
            contact_List : contact
        })
    })
    .catch(function (err) {
      console.log(err);
    });

	

});

app.get('/practise', function(req,res){

	return res.render('ejsÜben',{titu:"EJS Üben"});
});

app.get('/praxis', function(req,res){

	return res.render('practise',{titu:"Let's Playaround with EJS"});
});


app.post('/add-contact', function(req,res){

	
	Contact.create({
		name: req.body.name,
		phone: req.body.phone,
	}).then((newContact)=>{	
					
		console.log('######## New Contact Created Successfully', newContact);
		return res.redirect('back');
	}).catch((e)=>{
		console.log(e);
	});

	// Alternative to above code
	//  Contact.create({
	// 	name: req.body.name,
	// 	phone: req.body.phone,
	// }).then((newContact)=>{
	// 	console.log('******** created', newContact );
	// 	return res.redirect('/');
	// }).catch((e)=>{
	// 	console.log(e);	
	// });
	
});


// for deleting a contact
app.get('/delete-contact/:phone', function(req,res){

	// get the id from the query in the url

	let id = req.query.id;
	// find the contact in the db using object id & delete

	Contact.findByIdAndDelete(id, function(err){

		if(err){
			console.info('Error in deleting the object from Mdb');
			return;
		}
		return res.redirect('back');
	});

	
});

app.listen(pNum, function(err){

	if(err){
		console.log("Ooopy etwas schief gegangen")
	}

	console.log('Server is running at the specified RPM ', pNum);
});