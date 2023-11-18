"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    try {
      setLoading(true)
      await axios.get('/api/users/logout')
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
    <div>
      <button className="btn btn-error" onClick={logout}>
        {
          loading && <span className="loading loading-spinner loading-sm"></span>
        }
        LOGOUT
      </button>
    </div>
  )
}
