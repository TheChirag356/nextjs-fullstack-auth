import User from '@/models/userModels';
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from "bcryptjs"
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    const { email } = reqBody

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        console.log(user)

        await sendEmail({ email, emailType: "FORGOT_PASSWORD", userId: user._id })

        return NextResponse.json({ message: "Reset password link sent." }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { newpassword, confirmpassword, token } = reqBody;
        console.log(reqBody)

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 400 })
        }

        if (newpassword !== confirmpassword) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newpassword, salt)

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}