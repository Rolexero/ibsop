import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

// * ant design && icons
import Sider from "antd/es/layout/Sider";
import { Button, Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import tw, { styled } from "twin.macro";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import { SidebarRightIcon } from "hugeicons-react";

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const setCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (window.innerWidth < 810) {
      setCollapsed(true);
    }
  }, []);

  return (
    <React.Fragment>
      <LayoutWrapper className="">
        <Sider
          width={collapsed ? 210 : 240}
          className={`${
            collapsed ? "mdMobile:hidden bg-white " : "visible sider bg-white"
          } h-screen`}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#411E39",
          }}
        >
          <div className="flex flex-col h-full p-2">
            <SidebarMenu onClick={setCollapse} collapsed={collapsed} />
          </div>
        </Sider>
        <Layout className="bg-[#fff]">
          <div
            className="border-b-[1px] mt-2  border-b-[#D6D7D7]"
            style={{ padding: 0, background: "#FFF" }}
          >
            <div className="flex justify-between p-2 md:px-4 items-center">
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="text"
                  className={` text-black md:hidden`}
                  icon={<SidebarRightIcon size={24} color={"#000"} />}
                  onClick={setCollapse}
                />
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-secondary-200 font-semibold text-base md:text-[20px]">
                    Hi Rolexero 👋
                  </span>
                  <span className="text-muted-100 hidden md:flex font-medium text-sm">
                    Manage your users{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ContentWrapper className="">
            <Suspense
              fallback={
                <SuspenseWrapper className="">
                  <p>Please wait</p>{" "}
                </SuspenseWrapper>
              }
            >
              <Outlet />
            </Suspense>
          </ContentWrapper>
          <Footer className="bg-white" />
        </Layout>
      </LayoutWrapper>
    </React.Fragment>
  );
};

const LayoutWrapper = styled(Layout)`
  ${tw` w-full h-screen bg-white  flex flex-row`}
`;

const SuspenseWrapper = styled.div`
  ${tw`m-auto flex h-[600px] items-center justify-center`}
`;

const ContentWrapper = styled(Content)`
  ${tw`bg-[#fff]  h-screen overflow-scroll  m-[10px] p-[10px]`}
`;

export const DashboardContentWrapper = styled(Content)`
  ${tw`bg-white  py-[20px]  rounded-md text-[#1F0E1C]  `}
`;

export default RootLayout;
