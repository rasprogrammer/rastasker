import { AiOutlinePlus, AiOutlineUserAdd } from "react-icons/ai";

import Layout from "@/components/Layout";
import AddTaskModal from "@/components/Modal/Task/AddTaskModal";
import TaskTable from "@/components/Table/TaskTable";
import { useState } from "react";

const Task = () => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Layout>
        <button
          type="button"
          className="text-white bg-blue-700 cursor-pointer d-flex items-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setIsAddModalOpen(true)}
        >
          <AiOutlinePlus />
          <span>New Task</span>
        </button>

        <TaskTable />

        <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </Layout>
    </>
  );
};

export default Task;
