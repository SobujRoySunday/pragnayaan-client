"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function ResetPasswordPage() {
  const [token, setToken] = useState("")
  const [reset, setReset] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const resetUserPassword = async () => {
    try {
      setLoading(true)
      await axios.post('/api/users/resetpassword', { token, password, rePassword })
      setReset(true)
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

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  const onReset = () => {
    if (token.length > 0) {
      resetUserPassword()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-base-300">
      <h1 className="text-4xl">Reset password</h1>
      <h2 className="p-2 text-primary ">{token ? `${token}` : "No token"}</h2>

      {token && !reset && (
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <div className="form-control mb-3">
              <input type="password" placeholder="New password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-control mb-3">
              <input type="password" placeholder="New password again" className="input input-bordered" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
            </div>

            <div className="form-control items-center">
              <button onClick={onReset} className="btn btn-success min-w-full mb-2">
                {
                  loading && <span className="loading loading-spinner loading-sm"></span>
                }
                Request
              </button>
            </div>
          </div>
        </div>
      )}

      {reset && (
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl text-accent">Password reset successful</h2>
          <Link href='/' className="btn btn-info mt-3">Login</Link>
        </div>
      )}

      {error && (
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl text-error">There was an error</h2>
          <Link href='/' className="btn btn-accent">Login</Link>
        </div>
      )}

    </div>
  )
}