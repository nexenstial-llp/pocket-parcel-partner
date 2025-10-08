import PageLayout from '@/components/layout/PageLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

const tabLinks = [
  { label: 'Domestic', to: '/tools/rate-calculator/domestic' },
  { label: 'International', to: '/tools/rate-calculator/international' },
]
export const Route = createFileRoute('/_authenticated/tools/rate-calculator')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout>
      <h2 className="text-xl">Shipping Rate Calculator</h2>
      <div className="flex mt-4 text-xl gap-4 font-semibold text-gray-500">
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
    </PageLayout>
  )
}
