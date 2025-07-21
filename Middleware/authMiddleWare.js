
import jwt from 'jsonwebtoken'
import User from '../Model/userModel.js';
import { ApiError } from '../Utils/ApiError.js';
import { asyncHandler } from '../Utils/asyncHandler.js';

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ApiError("unauthenticated ,Please log in again", 400))
    }
    const userDetails = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = userDetails

    next()
}


const verifyJwt =
    asyncHandler(
        async (req, res, next) => {
            try {
                const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
                if (!token) {
                    throw new ApiError(400, "Unauthenticated request")
                }

                const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


                const user = await User.findById(decodedToken.id).select("-password -refreshToken")

                if (!user) {
                    throw new ApiError(401, "Invalid access token ");
                }

                req.user = user;
                next();
            } catch (error) {
                throw new ApiError(401, error?.message || "Invalid access token")
            }
        }
    )

const authorisedRoles = (...roles) => async (req, res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
        return next(
            new Apperror("You do not have permission to you access this route", 400)
        )
    }
}


const authorisedSubscriber = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (user.role !== 'Admin' && user.subscription.status !== 'active') {
        return next(
            new Apperror('Plase subscribe to access this cource ', 400)
        );
    }
    next();
}
export { isLoggedIn, authorisedRoles, authorisedSubscriber, verifyJwt }
