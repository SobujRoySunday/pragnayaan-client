import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center p-3">
      {/* Search bar */}
      <div className="flex flex-row gap-1">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered input-sm w-52" />
        </div>
        {/* <div className="form-control">
          <button className="btn btn-circle btn-accent">
            <Image className="w-4 invert" src='/images/search.png' alt="Search icon" width={16} height={16} />
            </button>
          </div> */}
      </div>

      {/* Options */}
      <div className="flex flex-row justify-center items-center gap-3">
        <button>
          <Image className="w-5 invert" src='/images/bell.png' alt="notification icon" width={100} height={100} />
        </button>
        <Link href='/dashboard/dev/profile'>
          <Image className="w-5 invert" src='/images/user.png' alt="user icon" width={100} height={100} />
        </Link>
        <Link href='/dashboard/dev/settings'>
          <Image className="w-5 invert" src='/images/settings.png' alt="settings icon" width={100} height={100} />
        </Link>
      </div>
    </div>
  )
}
