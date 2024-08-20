import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const signUpUser = asyncHandler(async (req, res) => {
  const { email, username, fullName, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const doesUserExist = await User.findOne({ $or: [{ username }, { email }] });

  if (doesUserExist) {
    throw new ApiError(400, "User with same username or email exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Needed");
  }

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar File is needed");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while creating user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});



const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access refresh token"
    );
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  console.log("Refresh Request Recieved");
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken ||  req.header("Authorization")?.replace("Bearer ", "");;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } =
      await generateAccessRefreshToken(user._id);
      const newRefreshToken = refreshToken;
      console.log(accessToken);
      console.log(newRefreshToken);

    // return res
    //   .status(200)
    //   .cookie("accessToken", accessToken, options)
    //   .cookie("refreshToken", newRefreshToken, options)
    //   .json(
    //     new ApiResponse(
    //       200,
    //       { accessToken, refreshToken: newRefreshToken },
    //       "Access token refreshed"
    //     )
    //   );
      return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", newRefreshToken, options)
  .json({
    success: true,
    message: "User logged in",
    accessToken : accessToken,
    refreshToken : newRefreshToken,
    userId : user._id,   
  });
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
}); 

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ApiError(400, "User with email or username not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
  };

  // return res
  //   .status(200)
  //   .cookie("accessToken", accessToken, options)
  //   .cookie("refreshToken", refreshToken, options)
  //   .json(
  //     new ApiResponse(
  //       200,
  //       { user: loggedInUser, accessToken, refreshToken },
  //       "User Logged In Successfully"
  //     )
  //   );
  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json({
    success: true,
    message: "User logged in",
    accessToken : accessToken,
    refreshToken : refreshToken,
    userId : user._id,   
  });
});

const logoutUser = asyncHandler(async (req,res) =>{

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
  
})



export { signUpUser, loginUser,logoutUser,refreshAccessToken };
