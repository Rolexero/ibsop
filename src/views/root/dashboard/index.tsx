import { Button } from "antd";

import { Add01Icon } from "hugeicons-react";
import UserListings from "./component/userListings";
import React from "react";
import UserModal from "./component/userModal";
import { useModalState } from "@/hooks/useModalState";

const Dashboard = () => {
  const { isOpen, closeModal, openModal } = useModalState();

  return (
    <React.Fragment>
      <div className="">
        <div className="flex justify-end gap-4">
          <Button
            type="primary"
            size="large"
            onClick={() => {
              openModal();
            }}
          >
            <Add01Icon
              size={20}
              className="hidden md:block"
              color={"#FFFFFF"}
            />
            Create User
          </Button>
        </div>

        <UserListings />
      </div>
      <UserModal isOpen={isOpen} closeModal={closeModal} />
    </React.Fragment>
  );
};

// const ChartGrid = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   column-gap: 15px;
//   row-gap: 15px;
//   margin-top: 62px;

//   @media (max-width: 1100px) {
//     grid-template-columns: 1fr;

//     & > :nth-child(1) {
//       order: 2;
//     }
//     & > :nth-child(2) {
//       order: 1;
//     }
//   }
// `;

export default Dashboard;
