"use client"

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function DashboardNav() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [loading, setLoading] = useState(false)

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/self')
    setUser(res.data.data)
  }

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

  useEffect(() => {
    getUserDetails()
  })

  return (
    <div><div className="navbar p-0 min-h-full bg-base-100 ">
      <div className="flex-1 mx-5">
        <Link href='/dashboard' className="text-lg normal-case font-medium italic">{user.role}Panel</Link>
      </div>
      <div className="flex-none mx-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="Profile Image" src="/images/profile.png" width={100} height={100} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={logout}>
              Logout
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
            </button></li>
          </ul>
        </div>
      </div>
    </div></div>
  )
}
