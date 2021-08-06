var DeptDB = require('../model/deptModel');

// create and save new department
exports.create = (req,res) => {
    // validate request
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    // new user
    const department = new DeptDB ({
        department:req.body.department,
        location:req.body.location,
        status:req.body.status
    })

    // save department in DB
    department
        .save(department)
        .then(data => {
            // res.send(data)
            res.redirect('/add-department')

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

        DeptDB.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message : "Not found department with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving department with id " + id})
            })

    } else {
        DeptDB.find()
            .then(department => {
                res.send(department)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving department information" })
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
    DeptDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update department with ${id}. Maybe department not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update department information"})
        })
}

//delete a department with specified department id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    DeptDB.findByIdAndDelete(id)
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot delete with ${id}. Maybe id is wrong!`})
        } else {
            res.send({
                message: "Department was deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete department with id="+id
        });
    });
}