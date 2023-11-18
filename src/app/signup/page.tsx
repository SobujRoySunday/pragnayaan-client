"use client"

import axios from "axios";
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

export default function Signup() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "std"
  });
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/signup", user);
      router.push('/')
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-300 justify-center items-center">
      <div className="text-center text-7xl font-light mb-5">
        Create new account
      </div>

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Your Fullname" className="input input-bordered" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="mymail@gmail.com" className="input input-bordered" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Your password" className="input input-bordered" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Retype Password</span>
            </label>
            <input type="password" placeholder="Your password again" className="input input-bordered" value={user.rePassword} onChange={(e) => setUser({ ...user, rePassword: e.target.value })} />
          </div>

          <div className="form-control items-center mt-5">
            <button onClick={signup} className="btn btn-primary min-w-full mb-2">
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
              Login
            </button>
            <Link href="/" className="label-text-alt link link-hover text-secondary">Already have an account?</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
