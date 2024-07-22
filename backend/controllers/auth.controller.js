import { AuthService } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function generateToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// USTVARI NOVEGA UPORABNIKA
export const register = async (request, response) => {
    //Destructuring
    // to je isto kot bi napisal:
    // const username = req.body.username
    // const password = req.body.password
    // ...
    const {username, email, password} = request.body;

    // ce vseh parametrov nimamo potem 
    if (!username | !email | !password) {
        response.status(400).json({
            message : "nekaj manjka!",
        });
        
    }
    const existingUser = await AuthService.findOneByEmail(email)

    if (existingUser) {
        response.status(400).json({
            message : "uporabnik ze obstaja",
        });
    }

    const hashedPassword = hashPassword(password);
    const user = await AuthService.createUser(username, email, hashedPassword);
    const token = generateToken(user.id);

    response.status(200).json({
        message : "uspelo nam je, uporabnik kreiran",
        user : {...user, token}
    });
    
}

// PRIJAVI SE 
export const login = async (request, response) => {
    const {email, password} = request.body;

    // ce vseh parametrov nimamo potem 
    if (!email | !password) {
        response.status(400).json({
            message : "nekaj manjka!",
        });
    }
    const existingUser = await AuthService.findOneByEmail(email);

    //ali je ta spremenljivka undefined ali null
    if (!existingUser) {
        response.status(400).json({
            message : "uporabnik s tem mailom ne obstaja"
        });
        
    }

    const isCorrectPassword = bcrypt.compare(password, existingUser.password);
    if (!isCorrectPassword) {
        response.status(400).json({
            message : "napacno geslo"
        });
        
    }
    
    const token = generateToken(user.id);

    response.status(200).json({
        message : "prijava uspesna!",
        user : {...user, token}
    });
    
}

export const me = async (request, response) => {
    const id = request.user;
    console.log(id);

    const user = await AuthService.findOneById(id);

    response.status(200).json({
        user : user
    });
}