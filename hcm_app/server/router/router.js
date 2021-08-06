const express = require('express');
const route =  express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const SalaryController = require('../controller/SalaryController');
const DeptController = require('../controller/DeptController');
const DayoffController = require('../controller/DayoffController');
const { users } = require('../user roles/roles');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/',services.homeRoutes);
route.get('/home',services.home);
route.get('/login',services.login);
route.get('/signup',services.signup);
route.get('/salary',services.salary)
route.get('/departments',services.departments)
route.get('/dayoff',services.dayoff)

// route.post('/register',sync (req,res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         user.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         res.redirect('/login')
//     } catch {
//         res.redirect('/signup')
//     }
//    console.log(users)
// })

/**
 * @description add users
 * @method GET /add-user
 */
route.get('/add-user',services.add_user)
route.get('/add-salary',services.add_salary)
route.get('/add-department',services.add_departments)
route.get('/add-dayoff',services.add_dayoff)

/**
 * @description for update users
 * @method GET /update-user
 */
route.get('/update-user',services.update_user)
route.get('/update-salary',services.update_salary)
route.get('/update-department',services.update_departments)
route.get('/update-dayoff',services.update_dayoff)

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

route.post('/api/salaries',SalaryController.create);
route.get('/api/salaries',SalaryController.find);
route.put('/api/salaries/:id',SalaryController.update);
route.delete('/api/salaries/:id',SalaryController.delete);

route.post('/api/departments',DeptController.create);
route.get('/api/departments',DeptController.find);
route.put('/api/departments/:id',DeptController.update);
route.delete('/api/departments/:id',DeptController.delete);

route.post('/api/dayoff',DayoffController.create);
route.get('/api/dayoff',DayoffController.find);
route.put('/api/dayoff/:id',DayoffController.update);
route.delete('/api/dayoff/:id',DayoffController.delete);

module.exports = route