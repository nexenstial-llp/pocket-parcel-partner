import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect } from 'react'

const tabLinks = [
  {
    label: 'Instant Reports',
    to: '/tools/reports/download-reports/instant-reports',
  },
  {
    label: 'Schedule Reports',
    to: '/tools/reports/download-reports/scheduled-reports',
  },
]
export const Route = createFileRoute(
  '/_authenticated/tools/reports/download-reports',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({
      to: '/tools/reports/download-reports/instant-reports',
      search: {
        dateRange: 'last30',
        module: 'allModules',
        reportType: 'allTypes',
      },
    })
  }, [])
  return (
    <div>
      <div className="flex mt-4 text-xl gap-10 font-semibold text-gray-500">
        {tabLinks?.map((item) => (
          <Link
            activeProps={{ className: 'text-indigo-500' }}
            to={item?.to}
            key={item?.label}
          >
            {({ isActive }) => {
              return (
                <div
                  className={`${isActive ? 'border-b-2 border-indigo-400 ' : ''} delay-150`}
                >
                  <span>{item?.label}</span>
                </div>
              )
            }}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
