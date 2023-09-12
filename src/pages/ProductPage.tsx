import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useQuery } from "react-query";
import { getProducts } from "../api/features/SendRequest";
import Loading from "./Loading";
import { ProductType } from "../types";

function ProductPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProduct] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [value, setValue] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { isLoading } = useQuery(
    ["product", searchValue, page, limit],
    () => getProducts(searchValue, page, limit),
    {
      cacheTime: 5000, // 5000 >> 5 seconds (cache is the time that the data will store at the cache and not fetch again)
      staleTime: 5000, // this is the time after it the data will be fetch again
      onSuccess: (data) => {
        console.log("success", data);
        setProduct(data?.data?.products);
      },
    }
  );
  
  if (isLoading) {
    return <Loading />;
  }
  const loadMore = () => {
    setPage(page + 1);
  };
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
          <Column field="title" header="Title"></Column>
          <Column field="category.name" header="Category"></Column>
          <Column field="author.name" header="Author"></Column>
          <Column field="createdAt" header="CreatedAt"></Column>
        </DataTable>
      </div>
      <div className="container m-auto">
        <Button
          className="text-center border border-white rounded-lg w-full mt-7"
          label="Load More"
          onClick={loadMore}
        />
      </div>
    </div>
  );
}

export default ProductPage;
