
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        userName: {
            type: String,
            minLength: [5, "Username must be at least 5 characters"],
            maxLength: [20, "Username should be less than 20 characters"],
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: true,
            select: false
        },

        role: {
            type: String,
            enum: ['user', 'admin', 'bank'],
            default: "user"
        },
        address: {
            type: String,
            trim: true,
            lowercase: true
        },
        mobileNumber: {
            type: Number
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
            userName: this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
export default User;

