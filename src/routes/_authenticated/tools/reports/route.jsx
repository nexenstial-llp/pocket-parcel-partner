import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { Button } from 'antd'
import { FaFileDownload, FaCalendarAlt } from 'react-icons/fa'
import { RiCalendarScheduleLine } from 'react-icons/ri'

const tabLinks = [
  {
    label: 'Download Reports',
    to: '/tools/reports/download-reports',
    icon: <FaFileDownload />,
  },
  {
    label: 'Reports Schedular',
    to: '/tools/reports/reports-scheduler',
    icon: <RiCalendarScheduleLine />,
  },
]
export const Route = createFileRoute('/_authenticated/tools/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  return (
    <div className="p-6 mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Reports</h1>
        <p className="text-gray-600">
          Download all your on-demand and scheduled reports here. You can also
          schedule a report for periodic delivery on your contact detail.
        </p>
      </div>
      <div className="flex my-10 gap-4 font-semibold">
        {tabLinks?.map((item) => (
          <Link to={item?.to} key={item?.label}>
            {({ isActive }) => {
              return (
                <Button
                  icon={item?.icon}
                  size="large"
                  className={`${isActive ? 'border-2 border-indigo-400 text-indigo-500 ' : ''} delay-150 `}
                >
                  <span>{item?.label}</span>
                </Button>
              )
            }}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
