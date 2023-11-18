"use client"

import Link from "next/link";
import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const forgot = async () => {

  }

  return (
    <div className="min-h-screen flex flex-col bg-base-300 justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">

          <div className="form-control">
            <input type="email" placeholder="mymail@gmail.com" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-control items-center">
            <button onClick={forgot} className="btn btn-success min-w-full mb-2">
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
              Request
            </button>
            <Link href="/" className="label-text-alt link link-hover text-secondary">Go back to login</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
