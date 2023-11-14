export default function Toast({ msg }: any) {
  return (
    <div className="toast">
      <div className="alert alert-error">
        <span>{msg}</span>
      </div>
    </div>
  )
}
