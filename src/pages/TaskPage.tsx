import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useQuery } from "react-query";
import { getTasks } from "../api/features/SendRequest";
import Loading from "./Loading";
import { ProductType } from "../types";

function TaskPage() {
  const [products, setProduct] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [value, setValue] = useState<string>();

  const { isLoading } = useQuery(
    ["task", searchValue],
    () => getTasks(searchValue),
    {
      cacheTime: 5000, // 5000 >> 5 seconds (cache is the time that the data will store at the cache and not fetch again)
      staleTime: 5000, // this is the time after it the data will be fetch again
      onSuccess: (data) => {
        console.log("success", data);
        if (!data?.length) {
          data = [data]
        }
        setProduct(data);
      },
    }
  );
  
  if (isLoading) {
    return <Loading />;
  }

  const dataFetching = () => {
    setSearchValue(value!);
  };

  return (
    <div className=" dark:text-white">
      <div className="card text-center relative bottom-5">
        <span className="p-input-icon-left mb-2">
          <i className="pi pi-search cursor-pointer" onClick={dataFetching} />
          <InputText
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </span>
        <DataTable
          value={products}
          scrollable
          scrollHeight="400px"
          className="container m-auto"
        >
          <Column field="_id" header="Id"></Column>
          <Column field="title" header="Title"></Column>
          <Column field="category" header="Category"></Column>
          {/* <Column field="userId" header="Author"></Column> */}
          <Column field="dueDate" header="Due Date"></Column>
          <Column field="completed" header="Is completed"></Column>
          
        </DataTable>
      </div>
      
    </div>
  );
}

export default TaskPage;
