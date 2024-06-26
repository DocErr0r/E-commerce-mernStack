const serverHandler= (fn)=>(req,res,next)=>{
    try{
        Promise.resolve(fn(req,res,next)).catch(err=>{
            res.send(err.message)
        })
    }catch(e){
        res.status(500).send('Internal server error')
    }
}
export default serverHandler;