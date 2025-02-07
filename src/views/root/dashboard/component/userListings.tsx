import { useDeleteUser, useGetUsers } from "@/services/useUserService";
import { Button, Dropdown, Input, Popconfirm, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { MoreHorizontalCircle01Icon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import UserModal from "./userModal";
import { useModalState } from "@/hooks/useModalState";

const UserListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { isOpen, closeModal, openModal } = useModalState();

  // Debounced function to delay search input updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: users, isLoading } = useGetUsers();

  const [currData, setCurrData] = useState();

  const deleteUser = useDeleteUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalUsers = users?.length;

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filteredUsers = users?.filter(
    (user: any) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const columns: ColumnsType<any> = React.useMemo(() => {
    return [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
      },

      {
        key: "username",
        title: "Username",
        dataIndex: "username",
      },
      {
        key: "phone",
        title: "Phone",
        dataIndex: "phone",
      },
      {
        key: "user_type",
        title: "User type",
        dataIndex: "user_type",
      },

      {
        key: "email",
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Action",
        key: "action",
        align: "center",
        render: (record) => (
          <Space size="middle">
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    label: "Edit",
                    key: "2",
                  },

                  {
                    label: (
                      <Popconfirm
                        okType="primary"
                        title="Sure to delete?"
                        onConfirm={() => {
                          deleteUser.mutate(record?.id);
                        }}
                      >
                        <p className="w-full text-left">Delete</p>
                      </Popconfirm>
                    ),
                    key: "3",
                  },
                ],
                onClick: ({ key }) => {
                  if (key === "1") {
                  } else if (key === "2") {
                    openModal();
                    setCurrData(record);
                  } else if (key === "3") {
                  }
                },
              }}
            >
              <Button className="border-none">
                <Space>
                  <MoreHorizontalCircle01Icon size="20" color="#5C4D58" />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        ),
      },
    ];
  }, []);

  return (
    <React.Fragment>
      <div className="md:flex-[2] flex-1   md:order-1 order-2 mt-8">
        <div className="flex gap-3 items-center ">
          <p className="text-secondary-200 text-base font-medium">All Users</p>

          <Input
            className="w-[40%]"
            name={"name"}
            placeholder="Search for users..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
        <TableWrapper>
          <Table
            loading={isLoading}
            className="overflow-scroll mt-6 no-scrollbar whitespace-nowrap"
            columns={columns}
            dataSource={filteredUsers}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalUsers,
              onChange: handlePageChange,
              showSizeChanger: true, // Allows changing the number of items per page
              pageSizeOptions: ["5", "10", "20", "50"], // Page size options
            }}
          />{" "}
        </TableWrapper>
      </div>

      <UserModal
        action={"update"}
        isOpen={isOpen}
        closeModal={closeModal}
        currData={currData}
      />
    </React.Fragment>
  );
};

export const TableWrapper = styled(Content)`
  ${tw`bg-transparent   rounded-md text-[#1F0E1C]`}
`;

export default UserListings;
