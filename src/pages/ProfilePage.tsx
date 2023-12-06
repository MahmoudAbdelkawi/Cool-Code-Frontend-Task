import { useMutation, useQuery } from "react-query";
import {
  deleteTask,
  editProduct,
  getMe,
  registerRequest,
} from "../api/features/SendRequest";
import "./profilePage.css";
import { useState } from "react";
import { CategoryType, UserType } from "../types";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
function ProfilePage() {
  const [user, setUser] = useState<UserType>();
  const [category, setCategory] = useState<CategoryType[]>([{id:0 , name:"personal"}, {id:1 , name:"work"} , {id:0 , name:"shopping"}]);
  const [tasks, setTasks] = useState<any>([]);
  const [editTaskState , setEditTaskState] = useState<any>()
  const [value, setValue] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: { id: "", name: "" },
  });
  const [visible, setVisible] = useState(false);
  const { isLoading, refetch } = useQuery("User", getMe, {
    cacheTime: 5000, // 5000 >> 5 seconds (cache is the time that the data will store at the cache and not fetch again)
    staleTime: 5000, // this is the time after it the data will be fetch again
    onSuccess: (data) => {
      setUser(data.user);
      setTasks(data.tasks);
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState<Position>("center");
  // const { isLoading: categoryLoading } = useQuery(
  //   ["Category"],
  //   getAllCategories,
  //   {
  //     cacheTime: 5000,
  //     staleTime: 5000,
  //     onSuccess: (data) => {
  //       setCategory(data?.data?.categories);
  //     },
  //   }
  // );
  const { mutate } = useMutation(
    registerRequest<any>,
    {
      onSuccess: (data) => {
        // console.log(data.data.product);
        setTasks([...tasks, data]);
      },
    }
  );
  const { mutate: deleteProductMutation } = useMutation(deleteTask, {
    onSuccess: () => {
      let newTasks = tasks.filter((task: any) => task.id !== tasks.id);
      setTasks(newTasks);
      refetch();
    },
  });
  const { mutate: editProductMutation } = useMutation(editProduct, {
    onSuccess: () => {
      // edit the task
      let newTasks = tasks.map(tasks => tasks.id === editTaskState.id ? editTaskState : tasks)
      setTasks(newTasks);
      // clean the state
      setEditTaskState(null)
      refetch();
    },
  });
  const editMethod = () => {
    editProductMutation(editTaskState)
    setModalVisible(false)
  }
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setModalVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="bg-green-600 hover:bg-red-950"
        onClick={editMethod}
        autoFocus
      />
    </div>
  );
    

  const handleAddTask = async () => {
    const data = {
      data: {
        title: value.title,
        category: value.category.name,
        description: value.description,
        dueDate: value.dueDate,
      },
      url: "/task",
    };
    await mutate(data);

    setVisible(false);
  };
  const show = (id:string) => {
    // setNewTitle(newTitle)
    // editProductMutation({id, title : newTitle })
    
    setEditTaskState({...editTaskState,id})
    
    setPosition(position);
    setModalVisible(true);
  };

  // if (isLoading || categoryLoading) {
  //   return <Loading />;
  // }
  return (
    <div className="dark:text-white">
      <div className="main">
        <h2 className="text-white">My Account</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <table>
              <tbody>
                  {/* <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{user?.name}</td>
                  </tr> */}
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>:</td>
                  <td>{user?.role}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>:</td>
                  <td>{`${user?.createdAt}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Dialog
          header="Add Product"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-col gap-3">
            <InputText
              value={value.title}
              placeholder="Title"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, title: e.target.value }))
              }
            />
             <InputText
              value={value.description}
              placeholder="description"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, description: e.target.value }))
              }
            />
             <InputText
              value={value.dueDate}
              placeholder="dueDate"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
            
              <Dropdown
                value={value.category}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, category: e.value }))
                }
                options={category}
                optionLabel="name"
                placeholder="Select a Category"
                className="w-full md:w-14rem"
              />
            
            <Button onClick={handleAddTask}>Add Product</Button>
          </div>
        </Dialog>
        {user?.role === "user" ? (
          <>
            <div className="flex justify-between items-center py-4">
              <h2>My Tasks</h2>
              <Button onClick={() => setVisible(true)}>Task Product</Button>
            </div>
            <div className="card">
              <div className="card-body">
                <i className="fa fa-pen fa-xs edit"></i>
                <div className="social-media">
                  <table>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task._id}>
                          <td>Name</td>
                          <td>:</td>
                          <td>{task?.title}</td>
                          <td>
                            <Button
                              label="Edit"
                              icon="pi pi-check"
                              className=" p-button-text cursor-pointer"
                              onClick={()=>show(task._id)}/* editProductMutation({id: product.id, title : newTitle }) */
                            />
                          </td>
                          <td>
                            <Button
                              onClick={() => deleteProductMutation(task._id)}
                              label="Delete"
                              icon="pi pi-times"
                              className="p-button-text p-button-text"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Dialog
              header="Edit Task"
              visible={modalVisible}
              position={position}
              style={{ width: "50vw" }}
              onHide={() => setModalVisible(false)}
              footer={footerContent}
              draggable={false}
              resizable={false}
            >
              <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edit Task
            </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 mb-1 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 "
                placeholder="Task title"
                onChange={(e) => setEditTaskState({...editTaskState , title : e.target.value})}
                value={editTaskState?.title}
              />
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 "
                placeholder="Task description"
                onChange={(e) => setEditTaskState({...editTaskState , description : e.target.value})}
                value={editTaskState?.description}
              />
              <input
                type="text"
                name="dueDate"
                id="dueDate"
                className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 "
                placeholder="Task dueDate"
                onChange={(e) => setEditTaskState({...editTaskState , dueDate : e.target.value})}
                value={editTaskState?.dueDate}
              />
               <Dropdown
                value={editTaskState?.category}
                onChange={(e) =>
                  setEditTaskState({ ...editTaskState, category: e.value })
                }
                options={category}
                optionLabel="name"
                placeholder="Select a Category"
                className="w-full md:w-14rem "
              />
              {/* <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Task name"
                onChange={(e) => setEditTaskState({...editTaskState , title : e.target.value})}
                value={editTaskState?.title}
              /> */}
            </Dialog>
          </>
          
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
