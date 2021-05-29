const handleRegister = (req ,res, db, bcrypt) => {
    const  {email , name , password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email : email
        })
        .into('login')
        //.returning(email)
        // db.select('email').from('login').where('id',loginEmail).then(data => {
                    
        // }),
        .then(loginEmail => {
            
            //console.log(loginEmail);

            return trx('users')
           
            
            .insert({
                email : email,
                name: name,
                joined : new Date(),
            
            }).then(response => {
               // res.json(user[0]);
              // console.log(response);
               ((db.select('*').from('users').where('id' , response))).then(data => {
                   res.json(data[0]);
                
               });
               
            })

        })
      

        .then(trx.commit)
        .catch(trx.rollback)

    })
   

    .catch(err => res.status(400).json("unable to register"))
    /*database.users.push({
        id: '125',
        name: name,
        email: email,
        
        enteries : 0,
        joined : new Date()
        
    })*/


}


module.exports ={
    handleRegister: handleRegister
}