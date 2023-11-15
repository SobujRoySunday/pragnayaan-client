"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const login = async () => {
    try {
      await axios.post(`/api/users/login`, user)
      router.push('/dashboard')
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data)
      } else if (error.request) {
        console.log(error.request);
        toast.error(error.request)
      } else {
        console.log('Error', error.message);
        toast.error(`Error ${error.message}`)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-300 justify-center items-center">
      <div className="text-center text-7xl font-light mb-5">
        Login here
      </div>

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="mymail@gmail.com" className="input input-bordered" value={user.email} onChange={(e) => setUser({ email: e.target.value, password: user.password })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Your password" className="input input-bordered" value={user.password} onChange={(e) => setUser({ email: user.email, password: e.target.value })} />
            <label className="label">
              <Link href="/forgot" className="label-text-alt link link-hover text-error">Forgot password?</Link>
            </label>
          </div>

          <div className="form-control items-center">
            <button onClick={login} className="btn btn-primary min-w-full mb-2">Login</button>
            <Link href="/signup" className="label-text-alt link link-hover text-secondary">Create a new account</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
