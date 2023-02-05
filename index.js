


import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'revisionn'
})



app.get('/' , (req,res) => {
    res.end("Hello world")
})


app.get('/users' , (req,res) => {
    connection.execute('SELECT * FROM mohamed ' , (err, data) => {
        if (err) {
            res.json(err)
        }else {
            res.json(data)
        }
    })
})
app.get('/user/:id' , (req,res) => {
    const {id} = req.params
    connection.execute(`SELECT * FROM mohamed where id =${id}` , (err,data) => {
        if (err) {
            res.json(err)
        }else {
            res.json(data)
        }
    })
})

app.post('/addUser' , (req,res) => {
    const {name,email,password} = req.body
    connection.execute(`INSERT INTO mohamed (name,email,password) values ('${name}' , '${email}'  , '${password}') `)
    res.json({msg : "Success"})
})

app.delete('/deleteUser' , (req,res) => {
    const {id} = req.body
    connection.execute(`DELETE FROM mohamed where id=${id}` , (err,data) => {
    })
})



app.put('/updateUser' , (req,res) => {
    const {id,name,email,password} = req.body
    connection.execute(`UPDATE mohamed set name='${name}' , email='${email}' , password='${password}' where id=${id}`,(err,data) => {
        if (err) {
            res.json({msg : err})
        }else {
            res.json({msg : "UPDATED Succesfully"})
        }
    })
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})