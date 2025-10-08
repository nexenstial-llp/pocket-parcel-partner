import PageLayout from '@/components/layout/PageLayout'
import ResponsiveCard from '@/components/ui/ResponsiveCard'
import { createFileRoute } from '@tanstack/react-router'
import {
  Breadcrumb,
  Button,
  DatePicker,
  Input,
  Radio,
  Select,
  Table,
} from 'antd'

export const Route = createFileRoute('/_authenticated/orders/')({
  component: RouteComponent,
})

const columns = [
  {
    title: 'Reference Number',
    dataIndex: 'reference_number',
    key: 'reference_number',
  },
  {
    title: 'AWB',
    dataIndex: 'awb',
    key: 'awb',
  },
  {
    title: 'Order ID',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: 'Carrier',
    dataIndex: 'carrier',
    key: 'carrier',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Pick Date',
    dataIndex: 'pick_date',
    key: 'pick_date',
  },
  {
    title: 'Order Status',
    dataIndex: 'order_status',
    key: 'order_status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
]

function RouteComponent() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Orders' }]} />
      <ResponsiveCard size="small" title="Search">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <Radio.Group>
              <Radio value={'AWB'}>AWB</Radio>
              <Radio value={'reference_number'}>Reference Number</Radio>
              <Radio value={'order_id'}>Order ID</Radio>
            </Radio.Group>
            <Input.Search placeholder="Search" />
          </div>
          <div className="flex gap-2">
            <Button disabled type="primary">
              Generate Report
            </Button>
            <Button disabled>Bulk Download labels</Button>
          </div>
        </div>
      </ResponsiveCard>
      <ResponsiveCard size="small">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center overflow-x-auto">
            <Select
              style={{ minWidth: 150 }}
              options={[
                { label: 'SELF - Self Demo', value: 'self' },
                { label: 'Bluedart - Bluedart', value: 'BLUEDART' },
                { label: 'DTDC - PP <> DTDC', value: 'DTDC' },
              ]}
              placeholder="Carrier Partner"
              allowClear
            />
            <Select
              options={[
                { label: 'SUCCESS', value: 'SUCCESS' },
                { label: 'IN PROGRESS', value: 'IN PROGRESS' },
                { label: 'FAILURE', value: 'FAILURE' },
              ]}
              placeholder="Order Status"
              allowClear
            />
            {/* Delivery Type */}
            <Select
              options={[
                { label: 'FORWARD', value: 'FORWARD' },
                { label: 'REVERSE', value: 'REVERSE' },
              ]}
              placeholder="Delivery Type"
              allowClear
            />
            {/* Created Date */}
            <DatePicker.RangePicker placeholder={'Created Date'} />
          </div>
          <Table bordered size="small" columns={columns} />
        </div>
      </ResponsiveCard>
    </PageLayout>
  )
}
