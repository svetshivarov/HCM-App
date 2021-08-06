const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = ''
const User = require('./server/model/accountSchema')
const path = require('path');

const connectDB = require('./server/db/db_connect');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||3000

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//set view engine
app.set("view engine","ejs") //pug ili html sashto moje na mqstoto na ejs
//app.set("views",path.resolve(__dirname,"views/ejs"))
app.use(express.urlencoded({extended: false}))

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
//css/style.css
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', require('./server/router/router'))

//LOGIN
app.post('/views/login', async(req,res) => {
    const {username, password} = req.body

    if(!user) {
        return res.json({status: 'error', error:'Invalid username/password'})
    }

    if(await bcrypt.compare(password, user.password)) {
        // the username and password combination are correct and successful
        
        // JSON Web Token
        const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
            JWT_SECRET
        )
        return res.json({status: 'ok', data: token})
    }

    const user = await User.findOne({username}).lean()

    res.json({status: 'error', error:'Invalod username/password'})
})

// change password
app.post('/views/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 6) {
		return res.json({
			status: 'error',
			error: 'Password too short. Should be atleast 7 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

//SIGNUP
app.post('/views/signup',async(req,res) => {
    console.log(req.body)

    const {username, password: plainTextPassword} = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 6) {
		return res.json({
			status: 'error',
			error: 'Password too short. Should be at least 7 characters'
		})
	}

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
       const response = await User.create({
            username,
            password
        })
        console.log('User created successfully',response)
    } catch (error) {
        if(error.code === 11000) {
            // duplicate key
            return res.json({status: 'error', error: 'Username already in use'})
        }
        throw error
    }

    res.json({status: 'ok'})
})

app.listen(3000,()=>{console.log('Server is running on http://localhost:3000')});