"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

export default function CreateAccount() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  })

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/self')
    setUser(res.data.data)
  }

  useEffect(() => {
    getUserDetails()
  })

  let roles: string[] = []
  if (user.role === 'dev') {
    roles = ['admin', 'driver', 'client']
  } else if (user.role === 'admin') {
    roles = ['driver', 'client']
  }

  const router = useRouter()
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/signup", newUser);
      toast.success(`Successfully created an account for ${newUser.name}`)
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
            <input type="text" placeholder="Your Fullname" className="input input-bordered" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="mymail@gmail.com" className="input input-bordered" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Your password" className="input input-bordered" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Retype Password</span>
            </label>
            <input type="password" placeholder="Your password again" className="input input-bordered" value={newUser.rePassword} onChange={(e) => setNewUser({ ...newUser, rePassword: e.target.value })} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select className="select select-bordered w-full" onChange={(e) => {
              setNewUser({ ...newUser, role: roles[Number(e.target.value)] })
            }}>
              {
                roles.map((role, key) => <option key={key} value={key}>{role}</option>)
              }
            </select>
          </div>

          <div className="form-control items-center mt-5">
            <button onClick={signup} className="btn btn-primary min-w-full mb-2">
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
              Create account
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
