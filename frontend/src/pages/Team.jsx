import {
  AiOutlinePlus,
  AiOutlineUserAdd,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { useState } from "react";

import Layout from "@/components/Layout";
import TeamTable from "@/components/Table/TeamTable";
import PrimaryButton from "@/components/Button/PrimaryButton";
import AddTeamModal from "@/components/Modal/AddTeamModal";


const Team = () => {
  const [IsAddModalOpen, setIsAddModalOpen] = useState(false);;
  return (
    <>
      <Layout>
        <PrimaryButton onClick={() => setIsAddModalOpen(true)}>
          <AiOutlinePlus />
          <span>New Team</span>
        </PrimaryButton>

        <AddTeamModal isOpen={IsAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <TeamTable />
      </Layout>
    </>
  );
};

export default Team;
