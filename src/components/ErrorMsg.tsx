export default function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-sm text-red-600 mt-2">{msg}</p>
}
