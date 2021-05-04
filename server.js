const express=require('express')
const Logger=require('morgan')
const auth=require('./routers/auth')
//bringing connection module
const connectDb=require('./config/ConnectionDb')
//bringing config variable
const{NODE_ENV,PORT}=require('./config/index')

const app=express()
app.use(express.urlencoded({ extended: true }));
//body parser
app.use(express.json());
//loger use
if(NODE_ENV){
    app.use(Logger('dev'))
}
//connection
connectDb()
//using router
app.use('/auth',auth)
//setting up server
const Server=async()=>{
try {
    await app.listen(PORT, () => {
        console.info(`server is in ${NODE_ENV} mode at ${PORT}`);
    });
} catch (err) {
    console.info(err)
}
}
Server();
