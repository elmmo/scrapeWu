const {Initialize} = require('./initialize'); // sets up firestore
const express = require('express'); 
const Xray = require('x-ray'); 

Initialize.init(); 
const app = express(); 
const x = new Xray(); 

app.listen(3000, () => {
    console.log("Server running on port 3000."); 
}); 

x('http://catalog.whitworth.edu/undergraduate/mathcomputerscience/', '.sc_courselist', [{
    title: 'thead tr h3', 
    codes: x('tbody', ['.codecol']), 
    rows: x('tbody', ['tr'])
}]).then((res) => {
    for (let i in res) {
        dept.set({
            degree: res[i].title, 
            codes: res[i].codes, 
            rows: res[i].rows
        })
        // change to use getters and setters 
    }
}); 

app.get("/home", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]); 
}); 