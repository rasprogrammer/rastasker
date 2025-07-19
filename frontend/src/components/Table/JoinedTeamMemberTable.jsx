import JoinedTeamMemberRow from "@/components/Team/JoinedTeamMemberRow";

export default function JoinedTeamMemberTable() {
  const members = [
    { name: "Rajiv", email: "rajiv@gmail.com", contact: 29 },
    { name: "Antima", email: "sanjiv@gmail.com", contact: 25 },
    { name: "Rahul", email: "sohan@gmail.com", contact: 21 },
    { name: "Amit", email: "aman@gmail.com", contact: 22 },
  ];

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Member Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <JoinedTeamMemberRow
                key={index}
                name={member.name}
                email={member.email}
                contact={member.contact}
              />
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}
