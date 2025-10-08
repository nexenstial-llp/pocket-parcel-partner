import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { Menu } from 'antd'

export const Route = createFileRoute('/_authenticated/dashboard/international')(
  {
    component: RouteComponent,
  },
)
const items = [{ key: '/dashboard/international/overview', label: 'Overview' }]
function RouteComponent() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeKey = location.pathname
  const onClick = (e) => {
    navigate({ to: `${e.key}` })
  }
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[activeKey]}
        mode="horizontal"
        items={items}
        activeKey={activeKey}
      />
      <Outlet />
    </>
  )
}
