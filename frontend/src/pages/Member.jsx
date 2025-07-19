import { AiOutlinePlus, AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";

import Layout from "@/components/Layout";
import PrimaryButton from "@/components/Button/PrimaryButton";
import AddMemberModal from "@/components/Modal/Member/AddMemberModal";
import MemberTable from "@/components/Table/MemberTable";

export default function Member() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Layout>
        <PrimaryButton onClick={() => setIsAddModalOpen(true)}>
          <AiOutlinePlus />
          <span>New Member</span>
        </PrimaryButton>

        <AddMemberModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <MemberTable />
      </Layout>
    </>
  );
};
