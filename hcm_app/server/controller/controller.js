var UserDB = require('../model/model');

// create and save new user
exports.create = (req,res) => {
    // validate request
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    // new user
    const user = new UserDB ({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        department:req.body.department,
        startwork:req.body.startwork,
        endwork:req.body.endwork,
        status:req.body.status
    })

    // save department in DB
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')

        })
        .catch(err => {
            res.status(500).send ({
                message:err.message || "some error occured while creating a create operation"
            });
        });
}

//retrieve and return user/s
exports.find = (req, res)=> {

    if(req.query.id) {
        const id = req.query.id;

        UserDB.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    } else {
        UserDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}
// update an identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe department not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

//delete a department with specified department id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    UserDB.findByIdAndDelete(id)
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot delete with ${id}. Maybe id is wrong!`})
        } else {
            res.send({
                message: "User was deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete user with id="+id
        });
    });
}