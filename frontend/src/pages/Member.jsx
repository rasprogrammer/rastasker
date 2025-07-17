import { AiOutlinePlus, AiOutlineUserAdd } from "react-icons/ai";

import Layout from "@/components/Layout";

const Member = () => {
  return (
    <>
      <Layout>
        <button
          type="button"
          className="text-white bg-blue-700 cursor-pointer d-flex items-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <AiOutlinePlus />
          <span>New Member</span>
        </button>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Member name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Contat No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Tasks
                </th>
                <th scope="col" className="px-6 py-3">
                  Assign Task
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">rajiv@gmail.com</td>
                <td className="px-6 py-4">6202784972</td>
                <td className="px-6 py-4">15</td>
                <td className="px-6 py-4">
                  <AiOutlineUserAdd className="cursor-pointer text-xl" />
                </td>
                <td className="px-6 py-4">Act</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">rajiv@gmail.com</td>
                <td className="px-6 py-4">6202784972</td>
                <td className="px-6 py-4">15</td>
                <td className="px-6 py-4">
                  <AiOutlineUserAdd className="cursor-pointer text-xl" />
                </td>
                <td className="px-6 py-4">Act</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Aman Kumar
                </th>
                <td className="px-6 py-4">aman@gmail.com</td>
                <td className="px-6 py-4">8203485932</td>
                <td className="px-6 py-4">15</td>
                <td className="px-6 py-4">
                  <AiOutlineUserAdd className="cursor-pointer text-xl" />
                </td>
                <td className="px-6 py-4">Act</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Member;
