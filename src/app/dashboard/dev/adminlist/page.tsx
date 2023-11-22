"use client"

import { convertDateTime } from "@/utils/convertDateTime";
import axios from "axios";
import Image from "next/image"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const getAdminList = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users/adminlist')
      const users = response.data.users
      setUsers(users)
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
    getAdminList()
  }, [])

  return (
    <div className="flex flex-row justify-center max-h-[94.2vh] p-14">
      {loading && <span className="loading loading-spinner loading-lg"></span>}
      <div className="overflow-x-auto border-base-100 w-fit">
        {users.length ?
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Verified</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user: any) => {
                  return (
                    <tr key={user.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image width={100} height={100} src="/images/avatar.png" alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      {user.isVerified ? <td className="text-success">Verified</td> : <td className="text-error">Not Verified</td>}

                      <td>{convertDateTime(user.isCreatedAt)}</td>
                      <td>{convertDateTime(user.isUpdatedAt)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table> :
          (!loading && <label className="label text-error">No admin data found</label>)

        }
      </div>
    </div >
  )
}
