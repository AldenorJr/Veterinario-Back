import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface authUser {
    email: string;
    password: string;
    captchaToken: string;
}

class AuthUserService {
    async execute({email, password, captchaToken}: authUser) {
        const userAuth = await prismaClient.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        })
        
        const andress = `https://www.google.com/recaptcha/api/siteverify?secret=6LdeLMgnAAAAANlmhAnAoZ4l8telW4mF0nuQuMtF&response=${captchaToken}`
        const {success} = await fetch(andress, {
            method: "POST",
        }).then(res => res.json());

        if(success === false) {
            throw new Error('Incorrect captcha token authentication');
        }

        if(!userAuth) {
            throw new Error("User not found");
        }
        const passwordUser = await compare(password, userAuth.password);

        if(!passwordUser) {
            throw new Error("User not found");
        }

        const token = sign({
            name: userAuth.name,
            email: userAuth.email
        }, process.env.JWT_SECRET, {
            subject: userAuth.id,
            expiresIn: '7d'
        })

        return {
            id: userAuth.id,
            name: userAuth.name,
            email: userAuth.email,
            role: userAuth.role,
            token: token
        }

    }
}

export {AuthUserService}