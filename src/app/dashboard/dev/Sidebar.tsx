"use client"

import LogoutButton from "@/components/LogoutButton"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Sidebar() {
  const [user, setUser] = useState({ name: 'Your name' })
  const [urlState, setUrlSet] = useState('dashboard')

  const setUserData = async () => {
    try {
      const response = await axios.get('/api/users/self')
      const userData = response.data.user
      setUser(userData)
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
    }
  }

  useEffect(() => {
    setUserData()
  }, [])
  return (
    <div className="py-1 px-8 min-h-screen bg-base-200">
      {/* Profile */}
      <div className="flex flex-col justify-center items-center my-10">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image src="/images/avatar.png" alt="avatar" width={100} height={100} priority />
          </div>
        </div>
        <h2 className="text-xl text-primary font-bold">{user.name}</h2>
        <h3 className="text-lg">Developer</h3>
      </div>

      {/* Links */}
      <div className="flex flex-col justify-center items-start mb-10">
        <section className=" flex flex-col gap-4">
          <div className={`pl-4 text-sm ${urlState === 'dashboard' && 'text-secondary'}`}>
            <Link className="flex flex-row justify-center gap-3" href='/dashboard/dev/' onClick={() => { setUrlSet('dashboard') }}>
              <Image className="invert w-4 h-4" src='/images/home.png' alt="dashboard icon" width={50} height={50} />
              Dashboard
            </Link></div>
        </section>
      </div>

      <div className="flex flex-col mb-10 gap-4">
        <section className="flex flex-col items-start gap-4 w-full">
          <label className="text-sm text-info">User Management</label>
          <div className={`pl-4 text-sm ${urlState === 'adminlist' && 'text-secondary'}`}>
            <Link className="flex flex-row justify-center gap-3" href='/dashboard/dev/adminlist' onClick={() => { setUrlSet('adminlist') }}>
              <Image className="invert w-4 h-4" src='/images/security.png' alt="dashboard icon" width={50} height={50} />
              Admin list
            </Link>
          </div>
          <div className={`pl-4 text-sm ${urlState === 'driverlist' && 'text-secondary'}`}>
            <Link className="flex flex-row justify-center gap-3" href='/dashboard/dev/driverlist' onClick={() => { setUrlSet('driverlist') }}>
              <Image className="invert w-4 h-4" src='/images/driver.png' alt="dashboard icon" width={50} height={50} />
              Driver list
            </Link>
          </div>
          <div className={`pl-4 text-sm ${urlState === 'adduser' && 'text-secondary'}`}>
            <Link className="flex flex-row gap-3" href='/dashboard/dev/adduser' onClick={() => { setUrlSet('adduser') }}>
              <Image className="invert w-4 h-4" src='/images/new-account.png' alt="dashboard icon" width={50} height={50} />
              Add new user
            </Link>
          </div>
        </section>
        <section className="flex flex-col items-start gap-4 w-full">
          <label className="text-sm text-info">Business</label>
          <div className={`pl-4 text-sm ${urlState === 'newbus' && 'text-secondary'}`}>
            <Link className="flex flex-row justify-center gap-3" href='/dashboard/dev/newbus' onClick={() => { setUrlSet('newbus') }}>
              <Image className="invert w-4 h-4" src='/images/bus.png' alt="dashboard icon" width={50} height={50} />
              Create new bus
            </Link>
          </div>
          <div className={`pl-4 text-sm ${urlState === 'addbus' && 'text-secondary'}`}>
            <Link className="flex flex-row justify-center gap-3" href='/dashboard/dev/addbus' onClick={() => { setUrlSet('addbus') }}>
              <Image className="invert w-4 h-4" src='/images/new-page.png' alt="dashboard icon" width={50} height={50} />
              Add new bus
            </Link>
          </div>
          <div className={`pl-4 text-sm ${urlState === 'faq' && 'text-secondary'}`}>
            <Link className="flex flex-row gap-3" href='/dashboard/dev/faq' onClick={() => { setUrlSet('faq') }}>
              <Image className="invert w-4 h-4" src='/images/faq.png' alt="dashboard icon" width={50} height={50} />
              FAQ
            </Link>
          </div>
        </section>
      </div>

      <div className="flex flex-col justify-center items-start mb-10">
        <LogoutButton />
      </div>
    </div>
  )
}
