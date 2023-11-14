"use client"
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import Link from "next/link";

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
  const [toast, setToast] = useState({ vis: false, message: "" })

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data)
      router.push('/')
    } catch (error: any) {
      console.log("Signup failed:", error.response.data.error)
      setToast({
        vis: true,
        message: error.response.data.error
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      {toast.vis && <Toast msg={toast.message} />}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left mb-5">
          <h1 className="text-7xl font-light">Create a new account</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Full name" className="input input-bordered" value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Retype Password</span>
              </label>
              <input type="password" name="rePassword" placeholder="password" className="input input-bordered" value={user.rePassword} onChange={(e) => { setUser({ ...user, rePassword: e.target.value }) }} required />
            </div>
            <div className="form-control mt-6 items-center">
              <button className="btn btn-accent min-w-full" onClick={onSignup}>{loading && <span className="loading loading-spinner loading-xs"></span>} Create account</button>
              <Link href="/" className="label-text-alt link link-hover mt-2">Already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
