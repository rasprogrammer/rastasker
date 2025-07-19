import { AiFillEye } from "react-icons/ai";

export default function AssignTaskRow({taskid, title, description, progress}) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {taskid}
        </th>
        <td className="px-6 py-4">{title}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">{progress}</td>
        <td className="px-6 py-4"><AiFillEye className="text-xl cursor-pointer text-yellow-600" /></td>
      </tr>
    </>
  );
}
