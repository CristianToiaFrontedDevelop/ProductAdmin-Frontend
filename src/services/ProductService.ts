import { ProductSchema } from './../types/index';
import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema, Product } from "../types";
import axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: Number(data.price)
    })
      if (result.success) {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        await axios.post(url, {
          name: result.output.name,
          price: result.output.price
        })
      } else {
          throw new Error("Datos del producto inválidos")
      }
  } catch (error) {
    console.log(error)
  } 
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.data)
    console.log("Respuesta del backend:", data);

    if (result.success) {
      return result.output      
    } else {
      throw new Error("Error al obtener los productos...")
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getProductById(id : Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const { data } = await axios(url)
    const result = safeParse(ProductSchema, data.data)
    if (result.success) {
      return result.output      
    } else {
      throw new Error("Error al obtener los productos...")
    }
  } catch (error) {
    console.log(error)
  }
}
export async function UpdateProduct(data: ProductData, id: Product['id'] ) {
  try {
    // 1. Validar y parsear los datos
    const result = safeParse(ProductSchema, {
      // ...data, // esta linea reemplaza o mejor dicho copia todos los campos que no seran editados, en este caso x ejemplo nomber
      id, // El id se pasa directamente
      name: data.name,  // otra opcion es eliminar ...data, y agregar este name comentado pero en casos en que sean mas campos que seran iguales y no se editen conviene solo una linea que varios campos.
      price: Number(data.price),
      // 2. Convertir el string 'true'/'false' a un booleano
      availability: data.availability === "true",
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      throw new Error("Datos del producto inválidos para la actualización.");
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error; // Propaga el error para que sea capturado en el action
  }
}

export async function deleteProduct(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}

export async function updateProductAvailability(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}