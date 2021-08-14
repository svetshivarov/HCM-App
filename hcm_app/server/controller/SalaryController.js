var SalaryDB = require('../model/salaryModel');

// create and save new user
exports.create = (req,res) => {
    // validate request
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    // new salary
    const salary = new SalaryDB ({
        name:req.body.name,
        salary:req.body.salary,
        bonus:req.body.bonus,
        total:req.body.total
    })

    // save salary in DB
    salary
        .save(salary)
        .then(data => {
            // res.send(data)
            res.redirect('/add-salary')

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
        
        SalaryDB.findById(id)
        .populate({path: 'user', select:['name']})
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
        SalaryDB.find()
            .then(salary => {
                res.send(salary)
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
    SalaryDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

//delete a user with specified user id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    SalaryDB.findByIdAndDelete(id)
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