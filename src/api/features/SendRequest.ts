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

export async function getTasks(
  searchValue: string,
) {
  try {
    const response = await axios.get(
      `/task/${searchValue}`
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

export async function deleteTask(id: string) {
  try {
    const response = await axios.delete(`/task/${id}`);

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}
export async function editProduct(obj : any) {
  try {
    let newObject = {
      title: obj.title,
      description: obj.description,
      category: obj.category.name,
      dueDate: obj.dueDate,
      // id: obj.id,
    };
    console.log(newObject);
    const response = await axios.put(`/task/update/${obj.id}`, newObject );
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}

export async function getMe() {
  try {
    const response = await axios.get(`/auth/me`);
    console.log(response.data);
    
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred");
  }
}
