import { SidebarNavigationItem } from "@/constants/routes";
import { Button, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { DashboardSquare01Icon, SidebarRightIcon } from "hugeicons-react";

interface SidebarMenuProps {
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  onClick,
  collapsed,
}: SidebarMenuProps) => {
  const pathname = useLocation();
  const sidebarNavigation: SidebarNavigationItem[] = [
    {
      title: "Users",
      key: "users",
      url: "/users",
      icon: <DashboardSquare01Icon size={20} color={"#fff"} />,
    },
  ];

  const sidebarNavFlat = sidebarNavigation.reduce(
    (result: SidebarNavigationItem[], current) =>
      result.concat(
        current.children && current.children.length > 0
          ? current.children
          : current
      ),
    []
  );

  const currentMenuItem = sidebarNavFlat.find(
    ({ url }) => location.pathname === url
  );

  console.log(currentMenuItem, "currentMenuItem");

  const currentMenuItemNotFound = sidebarNavFlat.find(({ url }) =>
    location.pathname.includes(url)
  );

  const defaultSelectedKeys = currentMenuItem
    ? [currentMenuItem.key]
    : currentMenuItemNotFound
    ? [currentMenuItemNotFound.key]
    : [];

  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname)
  );

  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  const onClickHandler = () => {
    if (window.innerWidth < 426) {
      onClick();
    } else {
      return;
    }
  };

  return (
    <>
      <ImageContainer>
        <div className={`w-full flex justify-end`}>
          <Button
            type="text"
            className={`${
              !collapsed && window.innerWidth < 810 && "text-white"
            } md:text-white `}
            icon={<SidebarRightIcon size={24} color={"#fff"} />}
            onClick={onClick}
          />
        </div>
      </ImageContainer>
      <MenuBar
        style={{ height: 400 }}
        className="bg-primary my-[20px]   overflow-scroll hover:text-white text-white w-full h-[60%]"
        mode="inline"
        key={pathname as any}
        selectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        items={sidebarNavigation.map((nav) => {
          const isSubMenu = nav.children?.length;
          return {
            key: nav.key,
            title: nav.title,
            label: isSubMenu ? (
              <p className="">{nav.title}</p>
            ) : (
              <Link
                to={nav.url || ""}
                className="font-bold"
                onClick={onClickHandler}
              >
                {nav.title}
              </Link>
            ),
            icon: <span className="">{nav.icon}</span>,
            children:
              isSubMenu &&
              nav.children &&
              nav.children.map((childNav) => ({
                key: childNav.key,
                label:
                  childNav.children && childNav.children.length ? (
                    <p className="">{childNav.title}</p>
                  ) : (
                    <Link
                      to={childNav.url || ""}
                      onClick={onClickHandler}
                      className="text-primary"
                    >
                      {childNav.title}
                    </Link>
                  ),
                title: childNav.title,
                children:
                  childNav.children &&
                  childNav.children.map((nav) => ({
                    key: nav.key,
                    label: (
                      <Link
                        to={nav.url || ""}
                        onClick={onClickHandler}
                        className="text-white"
                      >
                        {nav.title}
                      </Link>
                    ),
                    title: nav.title,
                  })),
              })),
          };
        })}
      />
    </>
  );
};

const MenuBar = styled(Menu)`
  background: transparent;
  border-right: 0;

  a {
    width: 100%;
    display: block;
    font-weight: 500;
  }

  .ant-menu-item,
  .ant-menu-submenu {
    color: white !important;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .ant-menu-item-icon {
    width: 2rem;
  }
`;

const ImageContainer = styled.div`
  ${tw` flex gap-3 font-medium py-3 border-b-[0.5px]  border-solid border-[#FACABD] mx-2`}
`;

export default SidebarMenu;
