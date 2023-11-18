"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Profile() {
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
  return (
    <div className="flex flex-col justify-center items-center bg-base-200">
      <div className="p-40">
        <h1 className="text-7xl">Hello! {user.name}</h1>
        <div className="flex flex-row justify-center mt-10">
          <Link href='/dashboard/createAcc' className="btn btn-accent"> Create new account</Link>
        </div>
      </div>
    </div>
  )
}
