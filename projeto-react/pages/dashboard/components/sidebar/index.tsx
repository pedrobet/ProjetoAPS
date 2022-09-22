import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import { Container } from './styles';

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onOpen,
  onClose,
}: SidebarProps) => {
  return (
    <ProSidebar collapsed={!isOpen}>
      <Menu iconShape="round">
        {isOpen ? (
          <MenuItem icon={<FaArrowLeft />} onClick={onClose} />
        ) : (
          <MenuItem icon={<FaArrowRight onClick={onOpen} />} />
        )}
        <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
        <SubMenu title="Components" icon={<FaHeart />}>
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
