import TeamRow from "@/components/Team/TeamRow";

const TeamTable = () => {
    const teams = [
        {name: "Rajiv", members: 29},
        {name: "Antima", members: 25},
        {name: "Rahul", members: 21},
        {name: "Amit", members: 22},
    ];
    
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team name
              </th>
              <th scope="col" className="px-6 py-3">
                Members
              </th>
              <th scope="col" className="px-6 py-3">
                Add Member
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => {
                return <TeamRow key={i} name={team.name} members={team.members} />
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeamTable;
