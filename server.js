const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001
const app = express();
const path = require("path");
let db = require("./db/db.json");
const { v1: uuidv1 } = require('uuid');


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
});
app.get('/api/notes', (req,res)=>{
    res.json(db)
});


app.post('/api/notes', (req,res)=>{
    const {title,text} = req.body;
    const nodeAwesome = {
        title,
        text,
        id: uuidv1()
    }
    db.push(nodeAwesome)
    fs.writeFile("./db/db.json", JSON.stringify(db), err =>{
        if (err)console.error(err);
    })
    res.json(nodeAwesome);
})


app.delete('/api/notes/:id', (req,res)=>{
    const filterNotes = db.filter((item)=> item.id !== req.params.id)
    fs.writeFile("./db/db.json", JSON.stringify(filterNotes), err =>{
    if (err)console.error(err);
})
    db = filterNotes;
    res.json(db);
});

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
app.listen(PORT, ()=> {
console.log(`API server now on port 3001!!!!!!!!!`)
});