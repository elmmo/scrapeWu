const Firebase = require('./firebase'); // sets up firebase
const express = require('express'); 
const Xray = require('x-ray'); 
const beautify = require('js-beautify').js; 

// setting up firebase connection 
Firebase.init(); 
// setting up Node.js app 
const app = express(); 

const x = new Xray({
    filters: {
        stripIllegalChars: (value) => {
            return value.replace(/\./g, ' '); 
        }
    }
}); 

app.listen(3000, () => {
    console.log("Server running on port 3000."); 
}); 

x('http://catalog.whitworth.edu/undergraduate/mathcomputerscience/', '.sc_courselist', [{
    title: 'thead tr h3 | stripIllegalChars', 
    codes: x('tbody', ['.codecol']), 
    rows: x('tbody', ['tr'])
}]).then((res) => {
    for (let i in res) {
        Firebase.set("Math and Computer Science", res[i]); 
    }
}); 

app.get("/departments/math", (req, res, next) => {
    Firebase.get('Math and Computer Science', 'Requirements for a Mathematics - General, B A  (42-43)').then((data) => {
        res.json(data); 
    }); 
}); 