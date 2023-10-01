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
                    res.redirect('/api/products', 200, {info:'user'});
                } else {
                    res.status(401).send({respuesta: 'invalid password', message: password});
                }
            }else {
                res.status(404).send({respuesta: 'not found', mensaje: user})
            }
        } catch(error){
        res.status(400).send({error:`error en login ${error}`});
    }
});


sessionRouter.get('/logout', async (req, res) => {
    try{
        if(req.session.login){
            req.session.destroy();
            res.redirect('/api/sessions/login',200, {resultado: 'Usuario deslogueado'})
        }
        } catch(error){
        res.status(400).send({error:`error en logout ${error}`});
    }
});





export default sessionRouter;