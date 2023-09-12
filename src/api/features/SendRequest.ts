import axios from "axios";
import { toast } from "react-toastify";

interface LoginRequestType<T> {
  data: T;
  url: string;
}

// interface ErrorResponseType {
//     response : {
//         data : {
//             message : string;
//         }
//     }
// }

export async function registerRequest<T>(data: LoginRequestType<T>) {
  try {
    const response = await axios.post(data.url, data.data);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}

export async function getProducts(
  productName: string,
  page: number,
  limit: number
) {
  try {
    console.log(productName, page, limit);
    const response = await axios.get(
      `/products/searchOnProduct?title=${productName}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}

export async function getAllCategories() {
  try {
    const response = await axios.get(`/category/getAllcategory`);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await axios.delete(`/products/deleteProduct/${id}`);

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}
export async function editProduct(obj : {id: number , title : string}) {
  try {
    const response = await axios.patch(`/products/updateProduct/${obj.id}`, {title : obj.title});
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}

export async function getMe() {
  try {
    const response = await axios.get(`/auth/getMe`);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}
