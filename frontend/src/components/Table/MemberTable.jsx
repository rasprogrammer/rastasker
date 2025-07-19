import { useState } from "react";

import MemberRow from "@/components/Member/MemberRow";
import JoinTeamInMemberModal from "@/components/Modal/Member/JoinTeamInMemberModal";
import AssignTaskInMemberModal from "@/components/Modal/Member/AssignTaskInMemberModal";
import EditMemberModal from "@/components/Modal/Member/EditMemberModal";
import DeleteMemberModal from "@/components/Modal/Member/DeleteMemberModal";

export default function MemberTable() {
  const members = [
    { name: "Rajiv", email: 'rajiv@gmail.com', contact: 6202784972, team: 'Team 1', tasks: 22 },
    { name: "Anitma", email: 'antima@gmail.com', contact: 8084321198, team: 'Team 2', tasks: 20 },
    { name: "Priyanka", email: 'priyanka@gmail.com', contact: 6208746434, team: '', tasks: 19 },
  ];

  const [joinMemberIndex, setJoinMemberIndex] = useState(null);
  const [assignTaskMemberIndex, setAssignTaskMemberIndex] = useState(null);
  const [editMemberIndex, setEditMemberIndex] = useState(null);
  const [deleteMemberIndex, setDeleteMemberIndex] = useState(null);

  return (
    <>
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
                Team
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
            {members.map((member, index) => (
              <MemberRow
                key={index}
                name={member.name}
                email={member.email}
                contact={member.contact}
                team={member.team}
                tasks={member.tasks}
                onJoinClick={() => setJoinMemberIndex(index)}
                onAssignClick={() => setAssignTaskMemberIndex(index)}
                onEditClick={() => setEditMemberIndex(index)}
                onDeleteClick={() => setDeleteMemberIndex(index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {joinMemberIndex !== null && (
        <JoinTeamInMemberModal
          isOpen={true}
          onClose={() => setJoinMemberIndex(null)}
          team={members[joinMemberIndex]}
        />
      )}
      
      {assignTaskMemberIndex !== null && (
        <AssignTaskInMemberModal
          isOpen={true}
          onClose={() => setAssignTaskMemberIndex(null)}
          team={members[assignTaskMemberIndex]}
        />
      )}

      {editMemberIndex !== null && (
        <EditMemberModal
          isOpen={true}
          onClose={() => setEditMemberIndex(null)}
          team={members[editMemberIndex]}
        />
      )}

      {deleteMemberIndex !== null && (
        <DeleteMemberModal
          isOpen={true}
          onClose={() => setDeleteMemberIndex(null)}
          team={members[deleteMemberIndex]}
        />
      )}
    </>
  );
}
