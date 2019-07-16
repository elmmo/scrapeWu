const Firebase = require('./firebase');
const express = require('express'); 
const Xray = require('x-ray'); 
const beautify = require('js-beautify').js; 

// SERVER
// setting up firebase connection 
Firebase.init(); 
// setting up Node.js app 
const app = express(); 
const router = express.Router(); 
const port = 3000; 

app.listen(port, () => {
    console.log(`Magic happens on port ${port}.`); 
}); 

app.use('/grad', router); 

// ROUTES 
// middleware 
router.use((req, res, next) => {
    console.log("Something is happening"); 
    next(); 
}) 

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/dept/:dept_id?').get((req, res) => {
    let department; 
    let major; 
    switch (req.params.dept_id) {
        case 'math': 
        case 'comp-sci':
            department = 'Math and Computer Science'; 
            break; 
    }
    switch(req.query.q) {
        case 'general ba':
            major = 'Requirements for a Mathematics - General, B A  (42-43)';
            break; 
        case 'human computer interaction':
            major = 'Requirements for a Human-Computer Interaction Major, B A  (53-54)';
            break; 
        case 'bioinformatics':
            major = 'Requirements for a Bioinformatics Major, B S  (68-69)'; 
            break; 
    }
    Firebase.get(department, major).then((data) => {
        res.json(data); 
    }).catch(err => {
        console.log(err); 
    }); 
})