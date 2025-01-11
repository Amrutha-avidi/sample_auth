const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const User = require('./models/user')
const { hashPassword, comparePassword } = require("./helpers/auth")


const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ['http://localhost:3000', 'https://capable-hummingbird-9d5c3b.netlify.app'],
    credentials: true,
}));

const PORT = 3003

connectDB()
app.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body
        console.log(userName)
        if (!userName) {
            return res.json({
                error: 'name is required'
            })
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            })
        }
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'User with this email already exist'
            })
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        newUser.save()
        return res.json(newUser)

    } catch (err) {
        console.log(err.message)
    }

})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }
        //chekc if passwords match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, userName: user.userName }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        } if (!match) {
            res.json({
                error: 'Passwords do not match'
            })
        }
    } catch (error) {
        console.log(error)

    }
})

app.get("/profile", (req, res) => {
    console.log(req)

    const {token} = req.cookies
    console.log(token)
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
})

app.get('/', (req, res) => {
    res.json("its working")
})







app.listen(PORT, () => {
    console.log(`server is running fine on  http://localhost:${PORT}`)
})