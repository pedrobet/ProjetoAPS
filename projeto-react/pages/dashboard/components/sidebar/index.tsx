import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MdDashboard, MdAppRegistration } from "react-icons/md";
import { useRouter } from "next/router";
import { VscRequestChanges } from "react-icons/vsc";
// import { Container } from './styles';

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isVisible?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onOpen,
  onClose,
  isVisible,
}: SidebarProps) => {
  const router = useRouter();
  return (
    <ProSidebar
      collapsed={!isOpen}
      style={{ display: isVisible ? "" : "none" }}
    >
      <Menu iconShape="round">
        {isOpen ? (
          <MenuItem icon={<FaArrowLeft />} onClick={onClose} />
        ) : (
          <MenuItem icon={<FaArrowRight onClick={onOpen} />} />
        )}
        <MenuItem
          icon={<MdDashboard />}
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Dashboard
        </MenuItem>
        <SubMenu title="Cadastros" icon={<MdAppRegistration />}>
          <MenuItem onClick={() => {
            router.push("/cadastro/usuario");
          }}>Cadastro de Usuários</MenuItem>
          <MenuItem onClick={() => {
            router.push("/cadastro/paciente");
          }}>Cadastro de Pacientes</MenuItem>
          <MenuItem onClick={() => {
            router.push("/cadastro/horario");
          }}>Cadastro de Horários</MenuItem>
        </SubMenu>
        <SubMenu title="Pedidos" icon={<VscRequestChanges />}>
          <MenuItem >Ver pedidos de marcação</MenuItem>
          <MenuItem>Confirmar pedidos de marcação</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
