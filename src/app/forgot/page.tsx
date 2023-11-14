import Link from "next/link";

export default function Forgot() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <input type="email" name="email" placeholder="Your email" className="input input-bordered" required />
            </div>
            <div className="form-control mt-2 items-center">
              <button className="btn btn-accent min-w-full">Reset password</button>
              <Link href="/" className="label-text-alt link link-hover mt-2">Go back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
