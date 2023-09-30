import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (req.session.login) {
            res.redirect('/api/products');
        } else {
            const user = await userModel.findOne({ email: email });
            if (user) {
                if (user.password === password) {
                    req.session.login = true;
                    // Redirigir al usuario después del inicio de sesión
                    res.redirect('/api/products', 200, {info: 'user'});
                } else {
                    // Contraseña incorrecta
                    res.status(400).send({ respuesta: 'invalid password' });
                }
            } else {
                // Usuario no encontrado
                res.status(404).send({ respuesta: 'not found' });
            }
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).send({ error: `error en login ${error}` });
    }
});

sessionRouter.get('/logout', async (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy();
            res.redirect('/api/sessions/login');
        } else {
            // Si el usuario ya está deslogueado, redirigir a la página de inicio de sesión
            res.redirect('/api/sessions/login');
        }
    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).send({ error: `error en logout ${error}` });
    }
});

export default sessionRouter;
