import PageLayout from '@/components/layout/PageLayout'
import TitleText from '@/components/ui/TitleText'
import { useLocation } from '@tanstack/react-router'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Radio } from 'antd'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDomestic = location.pathname.includes('domestic')
  const handleChange = (value) => {
    if (value === 'domestic') navigate({ to: '/dashboard/domestic/overview' })
    else navigate({ to: '/dashboard/international/overview' })
  }
  return (
    <PageLayout>
      <div className="flex items-center gap-4">
        <TitleText title="Dashboard" />
        {/* <Select
          className="w-32"
          value={isDomestic ? "domestic" : "international"}
          onChange={(e) => handleChange(e)}
          options={[
            { label: "Domestic", value: "domestic" },
            { label: "International", value: "international" },
          ]}
        /> */}
        <Radio.Group
          size="small"
          value={isDomestic ? 'domestic' : 'international'}
          defaultValue="domestic"
          buttonStyle="solid"
          onChange={(e) => handleChange(e.target.value)}
        >
          <Radio.Button value="domestic">Domestic</Radio.Button>
          <Radio.Button value="international">International</Radio.Button>
        </Radio.Group>
      </div>
      <Outlet />
    </PageLayout>
  )
}
