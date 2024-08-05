import express, { json } from 'express'
import cors from 'cors'
const app = express()


app.use(cors())
app.use(json())

let forceLoose = false
let forceWin = false

app.post('/click', (req, res) => {

    const findWin = checkWin(req.body.amount);

    return res.json({
        win : findWin == 1 ? true : false,
        message : findWin == 1 ? 'Make Him Win' : 'Make him loose',
    })
})

app.get('/force_win',(_, res)=>{
    forceLoose = false
    forceWin = true
    return res.json({
        win : true,
        message : "you have made user win money"
    })
})

app.get('/force_loose',(_, res)=>{
    forceLoose = true
    forceWin = false
    return res.json({
        win : false,
        message : "you have made user loose money"
    })
})
app.get('/neutral',(_, res)=>{
    forceLoose = false
    forceWin = false
    return res.json({
        message : "You have neutralised app"
    })
})


function checkWin(amount){
    if(forceWin){
        return 1;
    }
    if(forceLoose){
        return -1;
    }
    if(amount < 100){
        return 1;
    }else{
        return -1;
    }
}

app.listen(3000, () => {
    console.log("server is running at port  : 3000")
})
