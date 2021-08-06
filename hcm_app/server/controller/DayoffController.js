var DayoffDB = require('../model/dayoffModel');

// create and save new day off
exports.create = (req,res) => {
    // validate request
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    // new day off
    const dayoff = new DayoffDB ({
        employee:req.body.employee,
        start:req.body.start,
        last:req.body.last,
        total:req.body.total
    })

    // save day off in DB
    dayoff
        .save(dayoff)
        .then(data => {
            // res.send(data)
            res.redirect('/add-dayoff')

        })
        .catch(err => {
            res.status(500).send ({
                message:err.message || "some error occured while creating a create operation"
            });
        });
}

//retrieve and return day off
exports.find = (req, res)=> {

    if(req.query.id) {
        const id = req.query.id;

        DayoffDB.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message : "Not found day off with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving day off with id " + id})
            })

    } else {
        DayoffDB.find()
            .then(dayoff => {
                res.send(dayoff)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving day off information" })
            })
    }
}
// update an identified day off by dayoff id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    DayoffDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update day off with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update day off information"})
        })
}

//delete a day off with specified user id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    DayoffDB.findByIdAndDelete(id)
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot delete with ${id}. Maybe id is wrong!`})
        } else {
            res.send({
                message: "Day off was deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete day off with id="+id
        });
    });
}