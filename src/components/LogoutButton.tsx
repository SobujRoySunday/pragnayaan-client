"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter()
  const [toast, setToast] = useState({
    vis: false,
    message: ""
  })
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/')
    } catch (error: any) {
      console.log("Signup failed:", error.response.data.error)
      setToast({
        vis: true,
        message: error.response.data.error
      })
    }
  }

  return (
    <div>
      <button className="btn btn-error" onClick={logout}>LOGOUT</button>
    </div>
  )
}
