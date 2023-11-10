import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { hash } from 'bcrypt';

interface userSingUp {
    name: string;
    email: string;
    password: string;
    captchaToken: string;
}

class SignUpService {
    async execute ({name, email, password, captchaToken}: userSingUp) {
        if(!email || !password || !name || !captchaToken) {
            throw new Error('Incorrect dates');
        }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!email.match(emailRegex)) {
            throw new Error('Invalid email format');
        }

        const userVerify = await prismaClient.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        })
        if(userVerify) {
            throw new Error('Error, email already exists');
        }

        const andress = `https://www.google.com/recaptcha/api/siteverify?secret=6LdeLMgnAAAAANlmhAnAoZ4l8telW4mF0nuQuMtF&response=${captchaToken}`
        const {success} = await fetch(andress, {
            method: "POST",
        }).then(res => res.json());

        if(success === false) {
            throw new Error('Incorrect captcha token authentication');
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                password: passwordHash,
                email: email,
                name: name,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        })
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }

    }
}

export { SignUpService };