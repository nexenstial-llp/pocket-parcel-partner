import { createFileRoute } from '@tanstack/react-router'
import { Table } from 'antd'
import { useState } from 'react'
import NewPickupLocation from '../../../../components/pages/settings/pickupLocations/NewPickupLocation'
const columns = [
  {
    title: 'Pickup Location',
    key: 'pickup-location',
    dataIndex: 'pickup-location',
  },
  {
    title: 'Created On',
    key: 'created-on',
    dataIndex: 'created-on',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: 'State',
    key: 'state',
    dataIndex: 'state',
  },
]
export const Route = createFileRoute(
  '/_authenticated/settings/pickup-locations/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [data, setData] = useState([])
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4 flex justify-between ">
          <h2>Pickup Locations</h2>
          <NewPickupLocation data={data} setData={setData} />
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}
