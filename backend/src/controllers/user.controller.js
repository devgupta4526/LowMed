import {uploadOnCloudinary} from "../utils/cloudinary.js"
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/ApiResponse.js'

const signUpUser = asyncHandler(async (req, res) => {
  const { email, username, fullName, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw ApiError(400, "All Fields Are Required");
  }

  const doesUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  

  if (doesUserExist) {
    throw new ApiError(400, "User with same username or email exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is Needed");
  }

  let coverImageLocalPath;
  if(
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw ApiError(400, "Avatar File is needed");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  })

  const  createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(400,"Something went wrong while creating user");
  }

  return res.status(200).json(new ApiResponse(200,createdUser,"User Created Successfully"))
});


export {signUpUser};