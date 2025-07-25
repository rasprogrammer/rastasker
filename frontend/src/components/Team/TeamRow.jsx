import {
  AiOutlinePlus,
  AiOutlineUserAdd,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { useState } from "react";

const TeamRow = ({
  name,
  members,
  onJoinClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4">{members}</td>
        <td>
          <AiOutlineUserAdd
            className="cursor-pointer text-xl"
            onClick={onJoinClick}
          />
        </td>
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
};

export default TeamRow;
