import { PropsWithChildren } from "react";


export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className="bg-red-100 border-l-4 mt-12 border-red-500 text-center text-red-700 p-4" role="alert">
      {children}
    </div>
  )
}
