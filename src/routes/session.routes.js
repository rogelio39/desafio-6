import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        if(req.session.login){
            res.status(200).send({resultado : 'login ya existente'});
        } 
        const user = await userModel.findOne({email: email});
            if(user){
                if(user.password == password){
                    req.session.login = true;
                    req.session.name = user.first_name;
                    req.session.lastName = user.last_name;
                    res.redirect(200,`/static/products`);
                } else {
                    res.status(401).send({respuesta: 'invalid password', message: password});
                }
            }else {
                res.status(401).send({respuesta: 'not found', mensaje: user})
            }
        } catch(error){
        console.log(error);
    }
});


sessionRouter.get('/logout', async (req, res) => {
    try{
        if(req.session.login){
            req.session.destroy();
            res.redirect(200,'/static')
        }
        } catch(error){
        res.status(400).send({error:`error en logout ${error}`});
    }
});





export default sessionRouter;