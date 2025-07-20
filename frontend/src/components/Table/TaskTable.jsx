import { useState } from "react";

import TaskRow from "@/components/Task/TaskRow";
import AssignTaskModal from "@/components/Modal/Task/AssignTaskModal";
import EditTaskModal from "@/components/Modal/Task/EditTaskModal";
import DeleteTaskModal from "@/components/Modal/Task/DeleteTaskModal";

export default function TaskTable() {
  const tasks = [
    {
      taskId: 1,
      title: "Design Homepage",
      description: "Create the homepage UI using Tailwind CSS",
      taskType: "Design",
      assignedMember: "",
      status: "In Progress",
      expiryDate: "2025-07-25",
      action: "Edit",
    },
    {
      taskId: 2,
      title: "API Integration",
      description: "Integrate login API with frontend",
      taskType: "Development",
      assignedMember: "Priya Sharma",
      status: "Pending",
      expiryDate: "2025-07-23",
      action: "Edit",
    },
    {
      taskId: 3,
      title: "Fix Bugs",
      description: "Fix UI bugs in the dashboard",
      taskType: "Bugfix",
      assignedMember: "Aman Verma",
      status: "Completed",
      expiryDate: "2025-07-18",
      action: "View",
    },
    {
      taskId: 4,
      title: "Write Docs",
      description: "Write API documentation for authentication module",
      taskType: "Documentation",
      assignedMember: "Sneha Yadav",
      status: "In Progress",
      expiryDate: "2025-07-22",
      action: "Edit",
    },
    {
      taskId: 5,
      title: "Database Backup",
      description: "Backup the database before deployment",
      taskType: "Maintenance",
      assignedMember: "Mohit Singh",
      status: "Pending",
      expiryDate: "2025-07-24",
      action: "Start",
    },
  ];

  const [assignTaskIndex, setAssignTaskIndex] = useState(null);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Task Type
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Member
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Expiry Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <TaskRow
                key={index}
                taskid={task.taskId}
                title={task.title}
                description={task.description}
                tasktype={task.taskType}
                assigned_member={task.assignedMember}
                status={task.status}
                expiry_date={task.expiryDate}
                onAssignClick={() => setAssignTaskIndex(index)}
                onEditClick={() => setEditTaskIndex(index)}
                onDeleteClick={() => setDeleteTaskIndex(index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {assignTaskIndex !== null && (
        <AssignTaskModal
          isOpen={true}
          onClose={() => setAssignTaskIndex(null)}
          task={tasks[assignTaskIndex]}
        />
      )}

      {editTaskIndex !== null && (
        <EditTaskModal
          isOpen={true}
          onClose={() => setEditTaskIndex(null)}
          team={tasks[editTaskIndex]}
        />
      )}

      {deleteTaskIndex !== null && (
        <DeleteTaskModal
          isOpen={true}
          onClose={() => setDeleteTaskIndex(null)}
          team={tasks[deleteTaskIndex]}
        />
      )}
    </>
  );
}
