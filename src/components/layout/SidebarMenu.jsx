/* eslint-disable react/prop-types */
import { Menu } from "antd";

const SidebarMenu = ({
  selectedKey,
  openKeys,
  onOpenChange,
  sidebarData,
  collapsed,
  theme = "dark",
  mode = "inline",
}) => {
  return (
    <Menu
      theme={theme}
      mode={mode}
      selectedKeys={[selectedKey]}
      openKeys={collapsed ? undefined : openKeys}
      onOpenChange={onOpenChange}
      items={sidebarData}
    />
  );
};

export default SidebarMenu;
