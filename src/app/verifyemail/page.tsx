"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 text-primary ">{token ? `${token}` : "No token"}</h2>

      {verified && (
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl text-accent">Email Verified</h2>
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