import axios from "axios"
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/')
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data)
        console.log(error)
      } else if (error.request) {
        console.log(error.request);
        toast.error(error.request)
      } else {
        console.log('Error', error.message);
        toast.error(`Error ${error.message}`)
      }
    }
  }

  return (
    <button onClick={logout} className="btn btn-warning btn-sm w-full">
      Logout
    </button>
  )
}
