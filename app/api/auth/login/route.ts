import dbConnect from "@/shared/mongoConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/shared/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
      return new NextResponse("User does not exists", { status: 400 });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return new NextResponse("Wrong password", { status: 400 });
    }
    console.log({ user });

    return new NextResponse(
      {
        id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[AUTH_LOGIN] ERROR: ", error);
  }
}
