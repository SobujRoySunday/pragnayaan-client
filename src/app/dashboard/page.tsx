"use client"
import LogoutButton from "@/components/LogoutButton"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Profile() {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  })

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/self')
    setData(res.data.data)
  }

  useEffect(() => {
    getUserDetails()
  })
  return (
    <div>
      <h2>
        Name: {data.name && <span>{data.name}</span>}
      </h2>
      <h2>
        Email: {data.email && <span>{data.email}</span>}
      </h2>
      <h2>
        Role: {data.role && <span>{data.role}</span>}
      </h2>
      <LogoutButton />
    </div>
  )
}
