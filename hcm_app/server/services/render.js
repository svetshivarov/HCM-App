// render razlichni failove kato izpolzvame router 

const axios = require('axios');


exports.homeRoutes = (req,res) => {
    // Make a GET request to api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(response) {
        res.render('index',{users:response.data});
    })
    .catch(err => {
        res.send(err);
    })
    // res.render('index',{users:"New Data"});
}

exports.home = (req,res) => {
    res.render('home');
}

exports.salary = (req,res) => {
    res.render('salary');
}

exports.departments = (req,res) => {
    res.render('departments');
}

exports.dayoff = (req,res) => {
    res.render('dayoff');
}

exports.login = (req,res) => {
    res.render('login');
}

exports.signup = (req,res) => {
    res.render('signup');
}


exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.add_salary = (req,res) => {
    res.render('add_salary');
}


exports.add_departments = (req,res) => {
    res.render('add_department');
}

exports.add_dayoff = (req,res) => {
    res.render('add_dayoff');
}

exports.update_user = (req,res) => {
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userdata) {
        res.render("update_user",{user:userdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.update_salary = (req,res) => {
    axios.get('http://localhost:3000/api/salaries',{params:{id:req.query.id}})
    .then(function(salarydata) {
        res.render("update_salary",{salary:salarydata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.update_departments = (req,res) => {
    axios.get('http://localhost:3000/api/departments',{params:{id:req.query.id}})
    .then(function(deptdata) {
        res.render("update_departments",{departments:deptdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.update_dayoff = (req,res) => {
    axios.get('http://localhost:3000/api/dayoff',{params:{id:req.query.id}})
    .then(function(dayoffdata) {
        res.render("update_dayoff",{dayoff:dayoffdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
      req.user = users.find(user => user.id === userId)
    }
    next()
  }

  function setDepartment(req, res, next) {
    const deptId = req.body.deptId
    if (deptId) {
      req.department = departments.find(department => department.id === deptId)
    }
    next()
  }