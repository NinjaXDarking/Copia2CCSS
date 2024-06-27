const {request,response}= require('express');


const getMethod=(req=request, res=response)=>{
    
    const {nombre,universidad}=req.query;
    res.json({
        OK:"200",
        msj:"Mesaje GET devuelto desde el controlador ",
        nombre,
        universidad:"no enviada"
    });

}

const postMethod=(req=request, res=response)=>{

    const body=req.body;


    res.json({
        OK:"200",
        msj:"Mesaje POST desde el controlador",
        body
    });
    
console.log(body);

}

const putMethod=(req, res=response)=>{
    res.json({
        OK:"200",
        msj:"Mesaje PUT devuelto desde el controlador "
    });

}


const deleteMethod=(req, res=response)=>{
    res.json({
        OK:"200",
        msj:"Mesaje DELETE devuelto desde el controlador "
    });

}


module.exports={
    getMethod,
    postMethod,
    putMethod,
    deleteMethod
}