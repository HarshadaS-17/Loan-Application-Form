import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import User from "../Model/userModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import jwt from 'jsonwebtoken';

const cookieOption = {
    httpOnly: true,
    secure: true,
    default: true
};


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(400, "User not found");

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(400, error.message || "Something went wrong in generating tokens");
    }
};

const register = asyncHandler(async (req, res) => {
    const { userName, password, email, mobileNumber, role } = req.body;

    if ([userName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { mobileNumber }]
    });

    if (existedUser) {
        throw new ApiError(400, "User exists with the email or mobile number");
    }

    const user = await User.create({
        userName,
        email,
        password,
        mobileNumber,
        role
    });

    const createdUser = await User.findById(user._id).select('-password');

    if (!createdUser) {
        throw new ApiError(400, "Failed to create the user");
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(createdUser._id)

    return res
        .status(200)
        .cookie('accessToken', accessToken, cookieOption)
        .cookie('refreshToken', refreshToken, cookieOption)
        .json(new ApiResponse(
            200,
            createdUser,
            "User created successfully"
        ));
});

const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName }).select("+password");

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOption)
        .cookie("refreshToken", refreshToken, cookieOption)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});





const logOut = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { $set: { refreshToken: undefined } }, { new: true });

    res
        .status(200)
        .clearCookie("accessToken", cookieOption)
        .clearCookie("refreshToken", cookieOption)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


const refreshToken = asyncHandler(async (req, res) => {
    try {
        const inComingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!inComingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = await jwt.verify(inComingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            throw new ApiError(400, "Invalid refresh token");
        }

        if (inComingRefreshToken !== user.refreshToken) {
            throw new ApiError(400, "Refresh token is expired");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOption)
            .cookie("refreshToken", newRefreshToken, cookieOption)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: { fullName, email } },
        { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});


export {
    register,
    loginUser,
    logOut,
    refreshToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
};
