import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'antd'

export const Route = createFileRoute('/_authenticated/settings/api-setups/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 gap-2">
        <div className="">
          <h2>API Setup</h2>
          <p>Before you get our API token and develop See our documentation</p>
        </div>
        <Button
          variant="primary"
          text={'Test our API'}
          className="rounded-md"
        />
      </div>
      <div className="flex mt-4 justify-between items-center pb-4 gap-2">
        <div className="">
          <h2>Request for Live API Token</h2>
          <p>Refresh this page to generate a new token</p>
        </div>
        <Button type="primary">Request Live API Token</Button>
      </div>
      <div className="bg-gray-100 p-2">
        <p>Existing API Token</p>
        <div className="flex gap-2">
          <p>*******************</p>
        </div>
      </div>
    </div>
  )
}
