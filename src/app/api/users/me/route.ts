import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import { toast } from "sonner";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            toast.error("Invalid User")
            return NextResponse.redirect(new URL("/login", request.nextUrl))
        }

        return NextResponse.json({ message: "User Found", success: true, user }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}