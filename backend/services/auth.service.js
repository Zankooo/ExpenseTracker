// importamo clienta za bazo
import {prisma} from "../config/prisma.js"

// funkcija register
export class AuthService {

    

    // kle ko returnas ustvarjenega userja ti doda še id
    static async createUser(username, email, password){
        const user = await prisma.user.create({
            data: {
                username : username,
                password : password,
                email : email
            }
        });
        return user
    }

    static async findOneByEmail(email){
        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })
        return user;
    }

    static async findOneById(id){
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user;
    }

    static async delete(id){
        const user = await prisma.user.delete({
            where: {
                id : id
            }
        })
        return user
    }


}
