import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/shared/models/User";
import dbConnect from "@/shared/mongoConnection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new NextResponse("Missing username or password", { status: 400 });
    }

    if (username.length < 3 || password.length < 3) {
      return new NextResponse("Username or password too short", {
        status: 400,
      });
    }

    await dbConnect();

    const user = await User?.findOne({ username });
    if (user) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPasword,
    });

    await newUser.save();

    return new NextResponse("User created", { status: 200 });
  } catch (error) {
    console.log("[AUTH_REGISTER] ERROR: ", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function GET() {
  try {
    return new NextResponse("Hello world");
  } catch (error) {
    console.log("[AUTH_REGISTER] ERROR: ", error);
  }
}
