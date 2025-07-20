import {
  AiFillMerge,
  AiOutlineUserAdd,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";

export default function TaskRow({
  taskid,
  title,
  description,
  tasktype,
  assigned_member,
  status,
  expiry_date,
  onAssignClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-9F00 whitespace-nowrap dark:text-white"
        >
          {taskid}
        </th>
        <td className="px-6 py-4">{title}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">{tasktype}</td>
        <td className="px-6 py-4">
          {assigned_member ? (
            assigned_member
          ) : (
            <AiOutlineUserAdd
              className="cursor-pointer text-xl"
              onClick={onAssignClick}
            />
          )}
        </td>
        <td className="px-6 py-4">{status}</td>
        <td className="px-6 py-4">{expiry_date}</td>
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <AiFillEdit
              className="cursor-pointer text-xl"
              onClick={onEditClick}
            />
            <AiFillDelete
              className="cursor-pointer text-xl text-red-500"
              onClick={onDeleteClick}
            />
          </div>
        </td>
      </tr>
    </>
  );
}
