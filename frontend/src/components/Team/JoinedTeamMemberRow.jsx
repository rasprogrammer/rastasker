export default function JoinedTeamMemberRow({name, email, contact}) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4">{email}</td>
        <td className="px-6 py-4">{contact}</td>
      </tr>
    </>
  );
}
