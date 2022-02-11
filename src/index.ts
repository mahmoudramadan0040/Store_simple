import express from 'express'



const app = express()

const PORT = 3000

app.get("/",(req:express.Request,res:express.Response)=>{
    res.send("hello world");
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});

export default app;