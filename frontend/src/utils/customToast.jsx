import toast, { Toaster } from "react-hot-toast"
import "./customToast.module.css"

export const successMsg = (msg) => toast(msg)

export const CustomToast = () => {
  return (
    <Toaster toastOptions={{ className: "custom-toast", duration: 3000 }} />
  )
}
