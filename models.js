const Firebase = require('./firebase'); // for writing to firebase
const Xray = require('x-ray'); 

// sets up x-ray for scraping 
const x = new Xray({
    filters: {
        stripIllegalChars: (value) => {
            return value.replace(/\./g, ' '); 
        }
    }
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