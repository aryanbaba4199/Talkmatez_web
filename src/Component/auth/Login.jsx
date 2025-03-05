"use client";
import Api, { posterFunction } from "@/Api";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useApp } from "../Helpers/AppContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useApp();
    const [loading, setLoading] = useState(false);

    const handleLogIn = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            Swal.fire({
                title: "Error",
                text: "Please fill in all fields",
                icon: "error",
                confirmButtonText: "Close",
                timer: 5000,
            });
            return;
        }

        setLoading(true);
        try {
            const res = await posterFunction(Api.login, { loginId : email, password });

            if (res?.status === 200) {
                Swal.fire({
                    title: "Logged In Successfully",
                    icon: "success",
                    confirmButtonText: "Close",
                    timer: 3000,
                });
               
                setUser(res.data.user); 
            
               

                window.location.reload();
            } else {
                Swal.fire({
                    title: "Login Failed",
                    text: res?.message || "Invalid email or password",
                    icon: "error",
                    confirmButtonText: "Close",
                    timer: 5000,
                });
            }
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "Close",
                timer: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogIn}
                className="flex flex-col gap-4 bg-gradient-to-r from-[#15892e] to-yellow-400 p-8 w-96 rounded-2xl shadow-lg transition-all duration-300 hover:from-yellow-400 hover:to-red-500"
            >
                <div className="flex flex-col">
                    <label className="text-gray-900 font-semibold">Username</label>
                    <div className="flex items-center border border-gray-300 rounded-full bg-white px-4 py-3 focus-within:border-blue-500">
                        <input
                            type="number"
                            placeholder="Enter your username"
                            className="w-full outline-none bg-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-900 font-semibold">Password</label>
                    <div className="flex items-center border border-gray-300 rounded-full bg-white px-4 py-3 focus-within:border-blue-500">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full outline-none bg-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`relative inline-block px-6 py-3 text-center text-white font-medium tracking-wide border-2 border-white rounded-full shadow-md transition-all duration-500 ${
                        loading ? "bg-gray-500 cursor-not-allowed" : "hover:bg-orange-500 hover:border-orange-500"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
