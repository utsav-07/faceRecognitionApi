const { json } = require('body-parser');
const Clarifai  =  require('clarifai');


const app = new Clarifai.App({

    apiKey: 'a0cf4ff1f1bf410e9221a8d41c65be07'
  
  });


  const handleApiCall = (req , res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
  }
 


const handleImage = (req ,res ,db) => {
    const { id } = req.body;
    db('users').where('id' , '=' , id)
    .increment('enteries',1)

    .then(enteries => {
        //console.log(enteries);
        db.select('enteries').from('users').where('id' ,id).then(user => {
          //  console.log(user[0].enteries);
          res.json(user[0].enteries);
           
        })
       
        
    })
    .catch(err => res.status(400).json('unable to get enteries'))
    //let found = false ; 
    // database.users.forEach(user => {
    //     if(user.id === id){
    //         found = true;
    //         user.enteries++;
    //         return res.json(user.enteries);

    //     }
      
    // })

    // if(!found){
    //     res.status(400).json('not found')
    // }
}

module.exports ={
    handleImage: handleImage,
    handleApiCall : handleApiCall
}