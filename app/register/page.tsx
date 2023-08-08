"use client";
import { db } from "@/app/utils/db";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  // Check if user is logged in redirect him
  if (db.authStore.model) {
    router.push("/");
  }
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  // handle create/register user
  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      await db.collection("users").authWithPassword(data.email, data.password);
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  };

  const login = async (data) => {
    const info = {
      email: data.email,
      emailVisibility: true,
      password: data.password,
      passwordConfirm: data.password,
    };
    try {
      const record = await db.collection("users").create(info);
      await handleLogin(data);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="justify-center mt-44 m-2 items-center">
      <h1 className="text-center font-bold">
        Logged in? {db.authStore.isValid.toString()}
      </h1>
      {isLoading && <h1 className="text-center font-bold">LOADING... </h1>}
      <form
        onSubmit={handleSubmit(login)}
        className="p-4 border-2 border-gray-600"
      >
        <input
          className="py-3 px-4 bg-white border-0 text-black"
          placeholder="email?"
          type="email"
          {...register("email")}
        />
        <input
          type="password"
          className="py-3 px-4 bg-white border-0 text-black"
          placeholder="password?"
          {...register("password")}
        />
        <button
          onClick={login}
          type="submit"
          className="w-[95%] p-3 m-3 bg-gray-900 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
