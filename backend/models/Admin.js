import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
