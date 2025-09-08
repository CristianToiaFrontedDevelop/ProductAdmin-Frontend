// import { useNavigate } from "react-router-dom"
import { Link, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import formatCurrency from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
  product: Product
}

export async function action({params}: ActionFunctionArgs) {
  if(params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect('/?refresh=' + Date.now());
  }
}

export default function ProductDetails({product} : ProductDetailsProps) {
  const fetcher = useFetcher()
  // const navigate = useNavigate();
  const isAvailability = product.availability
    return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        { formatCurrency(product.price) }
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        <fetcher.Form method="post">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailability ? 'text-green-700 px-12' : 'text-red-700 px-8'}  rounded-md py-2 font-semibold shadow-sm hover:opacity-50 hover:cursor-pointer`}
          >
            {isAvailability ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="flex justify-around p-4 text-lg text-gray-800">
        <Link  // misma funcion que tiene Navigate, solo se usa en el return
          to={`/productos/${product.id}/editar`} 
          className="rounded-lg bg-indigo-200 border-4 border-indigo-600 px-6 py-2.5 font-semibold text-indigo-600 shadow-sm hover:bg-indigo-300"
        >
          Editar
        </Link>
         {/* <button  // misma funcion que tiene Link, se puede usar antes o después del return
          onClick={() => navigate(`/productos/${product.id}/editar`, {state: {product}})} // no sirve este enfoque para que la url sea independiente de las acciones internas
          className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Editar
        </button> */}
        <Form
          method="post"
          action={`productos/${product.id}/eliminar`}
          onSubmit={(e) => {
            if(!confirm('¿Deseas eliminar este producto?')) {
              e.preventDefault();
            }
          }}
        >
        <input
          type="submit"
          name="_action"
          value="Eliminar"
          className="rounded-lg bg-red-200 border-4 border-red-600 px-6 py-2.5 font-semibold text-red-600 shadow-sm hover:bg-red-300"
        /> 
        </Form>
      </td>
    </tr> 
  )
}
