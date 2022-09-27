import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {
  MdDashboard,
  MdAppRegistration,
  MdNotificationImportant,
} from "react-icons/md";
import { useRouter } from "next/router";
import { VscRequestChanges } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  useNotifications,
  useUpdateNotifications,
} from "../../../../hooks/useQueries";
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
  const { data } = useNotifications();
  useUpdateNotifications();
  
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
          <MenuItem
            onClick={() => {
              router.push("/cadastro/usuario");
            }}
          >
            Cadastro de Usuários
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/cadastro/paciente");
            }}
          >
            Cadastro de Pacientes
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/cadastro/horario");
            }}
          >
            Cadastro de Horários
          </MenuItem>
        </SubMenu>
        <SubMenu title="Pedidos" icon={<VscRequestChanges />}>
          <MenuItem onClick={()=>router.push('/marcacao/ver')}>Ver pedidos de marcação</MenuItem>
          <MenuItem onClick={()=>router.push('/marcacao/confirmar')}>Confirmar pedidos de marcação</MenuItem>
        </SubMenu>
        <MenuItem
          icon={
            data > 0 ? (
              <MdNotificationImportant color="red" />
            ) : (
              <IoMdNotificationsOutline />
            )
          }
        >
          {" "}
          {data} novo(s) pedido(s) de marcação
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
