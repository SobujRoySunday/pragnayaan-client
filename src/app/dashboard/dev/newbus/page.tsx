"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewBus() {
  const router = useRouter()
  const [type, setType] = useState({
    typeName: ""
  });
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true)
      await axios.post("/api/bus/new", type);
      toast.success('Created new bus type successfully')
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
    <div className="flex flex-row justify-center max-h-[94.2vh] p-14">
      <div className="flex flex-col items-center">
        <div className="text-center text-7xl font-light mb-5">
          Create new bus
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bus Type Name</span>
              </label>
              <input type="text" placeholder="Bus Type Name" className="input input-bordered" value={type.typeName} onChange={(e) => setType({ typeName: e.target.value })} />
            </div>

            <div className="form-control items-center mt-5">
              <button onClick={signup} className="btn btn-primary min-w-full mb-2">
                {
                  loading && <span className="loading loading-spinner loading-sm"></span>
                }
                Create
              </button>
            </div>


          </div>
        </div>
      </div>
    </div >
  )
}
