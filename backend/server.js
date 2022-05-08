require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const { ppid } = require('process')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))
// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
const orderRouter = require("./routes/orders");
app.use("/order",orderRouter);

const supplierRouter = require("./routes/supplier");

app.use("/supplier",supplierRouter);

const deliveryRouter = require("./routes/delivery");

app.use("/delivery",deliveryRouter);

const returnstockRouter = require("./routes/returnstock");

app.use("/returnstock",returnstockRouter);

const branchRouter = require("./routes/branch");

app.use("/branch",branchRouter);

const itemRouter = require("./routes/item");

app.use("/item",itemRouter);

const employeeRouter = require("./routes/employee");

 app.use("/employee",employeeRouter);

 const financesRouter = require("./routes/finances");

 app.use("/finances",financesRouter);



// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
