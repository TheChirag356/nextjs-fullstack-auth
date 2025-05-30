import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody)

        // Check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUserResponse = await newUser.save()
        console.log(savedUserResponse)

        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUserResponse._id })

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: savedUserResponse._id,
                username: savedUserResponse.username,
                email: savedUserResponse.email,
            },
        }, {
            status: 201

        })


    } catch (error: any) {
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });

    }
}