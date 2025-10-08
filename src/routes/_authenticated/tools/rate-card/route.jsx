import PageLayout from '@/components/layout/PageLayout'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const tabLinks = [
  { label: 'Forward', to: '/tools/rate-card/forward' },
  { label: 'Reverse', to: '/tools/rate-card/reverse' },
  { label: 'Document', to: '/tools/rate-card/document' },
]
export const Route = createFileRoute('/_authenticated/tools/rate-card')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout>
      <div className="flex gap-2 ">
        <h2 className="text-xl">Rate Card</h2>
        {/* <SelectTag placeholder={"Sele"} /> */}
      </div>
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
