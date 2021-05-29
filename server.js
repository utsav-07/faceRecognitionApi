const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const cors = require('cors');

const knex =  require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'smart-brain'
    }
  });


// db.select('email').from('login').where('id',10).then(data => {
//     console.log(data[0].email);
// });


const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users : [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password : 'john',
            enteries : 0,
            joined : new Date()
        },
        {
            id: '124',
            name: 'utsav',
            email: 'utsav@gmail.com',
            password : 'Utsav@07',
            enteries : 0,
            joined : new Date()
        }
    ],

    login: [
        {
            id: '987',
            hash: '',
            email : 'johan@gamil.com'
        }
    ]
}

app.get('/' , (req , res) => {
    //res.send('this is working')
    res.send(database.users)
})


app.post('/signIn' , (req , res) => signIn.handleSignIn(req,res,db,bcrypt))

app.post('/register' , (req, res) => register.handleRegister(req, res ,db, bcrypt ))

app.get('/profile/:id' , (req , res) => profile.handleProfileGet(req,res , db))




app.put('/image' , (req , res) => image.handleImage(req,res ,db))
app.post('/imageurl' , (req , res) => image.handleApiCall(req,res))



// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
//     // result == false
// });



app.listen(3000 , ()=> {
    console.log("utsav")
})

/*

/ --> = this is working
/signin --> POST = susccess/ fail
/register --> POST = user

/ptofile/:userID -- > GET = user

/image - > PUT --> user


*/