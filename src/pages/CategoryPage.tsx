import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CategoryType } from "../types";
import { getAllCategories, registerRequest } from "../api/features/SendRequest";
import Loading from "./Loading";
import { Dialog } from "primereact/dialog";
import { Position } from "../components/sidebar/Slidebar";

function CategoryPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState<Position>("center");
  const [addCategory, setAddCategory] = useState<string>("");
  const [category, setCategory] = useState<CategoryType[]>([]);
  const { mutate } = useMutation(registerRequest<{ name: string }>, {
    onSuccess: (data) => {
      console.log(data.data.category);
      setCategory([...category, data.data.category]);
    },
  });
  const [showAddCategory] = useState<boolean>(
    JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
      "ADMIN"
      ? true
      : false
  );
  const { isLoading } = useQuery(["Category"], getAllCategories, {
    cacheTime: 5000, // 5000 >> 5 seconds (cache is the time that the data will store at the cache and not fetch again)
    staleTime: 5000, // this is the time after it the data will be fetch again
    onSuccess: (data) => {
      console.log("success", data?.data?.categories);
      setCategory(data?.data?.categories);
    },
  });
  const addCategoryRequest = async () => {
    const data = {
      data: {
        name: addCategory,
      },
      url: "/category/addCategory",
    };
    await mutate(data);
    setModalVisible(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setModalVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Add"
        icon="pi pi-check"
        className="bg-green-600 hover:bg-red-950"
        autoFocus
        onClick={addCategoryRequest}
      />
    </div>
  );
  const show = (position: Position) => {
    setPosition(position);
    setModalVisible(true);
  };

  const AddCategory = () => {
    show("center");
  };

  return (
    <div className=" dark:text-white">
      <div className="card text-center">
        <DataTable
          value={category}
          scrollable
          scrollHeight="400px"
          className="container m-auto"
        >
          <Column field="name" header="Category"></Column>
        </DataTable>
        <div className="container m-auto">
          <Button
            className="text-center border border-white rounded-lg w-full mt-7"
            label="Load More"
          />
        </div>
      </div>
      {showAddCategory && (
        <div className="m-auto container flex justify-center items-center">
          <Button
            className="text-center border border-white rounded-lg mt-7"
            label="Add Category"
            onClick={AddCategory}
          />
        </div>
      )}

      <Dialog
        header="AddCategory"
        visible={modalVisible}
        position={position}
        onHide={() => setModalVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Category
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="category name"
              onChange={(e) => setAddCategory(e.target.value)}
              value={addCategory}
            />
          </div>
        </p>
      </Dialog>
    </div>
  );
}

export default CategoryPage;
