import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Table } from 'antd'
import { MdOutlineCreate } from 'react-icons/md'
// Components

import TaxModal from '@/components/pages/settings/taxConfiguration/modals/TaxModal'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tax Code',
    dataIndex: 'tax_code',
    key: 'tax_code',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Effective Tax',
    dataIndex: 'effective_tax',
    key: 'effective_tax',
  },
  {
    render: (_, record) => (
      <Button type="default" icon={<MdOutlineCreate />}>
        Add New Pickup Location
      </Button>
    ),
  },
]
export const Route = createFileRoute(
  '/_authenticated/settings/tax-configuration/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [data, setData] = useState([])
  return (
    <div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 gap-2">
        <h2>Tax Configuration</h2>

        <TaxModal />
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}
