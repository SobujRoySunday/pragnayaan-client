"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddBus() {
  const [types, setTypes] = useState([])
  const [bus, setBus] = useState({
    busNumber: "",
    busType: ""
  });
  const Bus = types.map(Bus => Bus)
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true)
      await axios.post("/api/bus/add", bus);
      toast.success('Added new bus type successfully')
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

  const getAllBusTypes = async () => {
    try {
      const response = await axios.get("/api/bus/getBusTypes")
      const fetchedTypes = response.data.types
      setTypes(fetchedTypes)
      setBus({ ...bus, busType: fetchedTypes[0].id })
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
    getAllBusTypes()
  }, [])

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
                <span className="label-text">Bus Number</span>
              </label>
              <input type="text" placeholder="Bus Type Name" className="input input-bordered" value={bus.busNumber} onChange={(e) => setBus({ ...bus, busNumber: e.target.value })} />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">User Role</span>
              </label>
              <select
                className="input input-bordered"
                onChange={e => setBus({ ...bus, busType: types[Number(e.target.value)].id })}
              >
                {
                  Bus.map((address, key) => <option key={key} value={key}>{address.typeName}</option>)
                }
              </select>
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
