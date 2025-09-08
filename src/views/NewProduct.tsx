import { ActionFunctionArgs, Form, Link, useActionData, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = ''
  if(Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if(error.length) {
    return error;
  }

  await addProduct(data);

  return redirect('/?refresh=' + Date.now()); // Redirige a la lista de productos después de agregar uno nuevo
}

export default function NewProduct() {

  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Registrar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form
        className="mt-10" 
        method="post"    
      >
        <ProductForm />  
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
