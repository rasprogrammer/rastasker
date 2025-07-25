import TeamRow from "@/components/Team/TeamRow";
import { useState } from "react";

import JoinMemberInTeamModal from "@/components/Modal/Team/JoinMemberInTeamModal";
import EditTeamModal from "@/components/Modal/Team/EditTeamModal";
import DeleteTeamModal from "@/components/Modal/Team/DeleteTeamModal";

const TeamTable = () => {
  const teams = [
    { name: "Rajiv", members: 29 },
    { name: "Antima", members: 25 },
    { name: "Rahul", members: 21 },
    { name: "Amit", members: 22 },
  ];

  const [openTeamIndex, setOpenTeamIndex] = useState(null);
  const [editTeamIndex, setEditTeamIndex] = useState(null);
  const [deleteTeamIndex, setDeleteTeamIndex] = useState(null);

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
            {teams.map((team, index) => (
              <TeamRow
                key={index}
                name={team.name}
                members={team.members}
                onJoinClick={() => setOpenTeamIndex(index)}
                onEditClick={() => setEditTeamIndex(index)}
                onDeleteClick={() => setDeleteTeamIndex(index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {openTeamIndex !== null && (
        <JoinMemberInTeamModal
          isOpen={true}
          onClose={() => setOpenTeamIndex(null)}
          team={teams[openTeamIndex]}
        />
      )}
      
      {editTeamIndex !== null && (
        <EditTeamModal
          isOpen={true}
          onClose={() => setEditTeamIndex(null)}
          team={teams[editTeamIndex]}
        />
      )}

      {deleteTeamIndex !== null && (
        <DeleteTeamModal
          isOpen={true}
          onClose={() => setDeleteTeamIndex(null)}
          team={teams[deleteTeamIndex]}
        />
      )}
      
    </>
  );
};

export default TeamTable;
