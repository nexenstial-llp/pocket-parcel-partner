import ShipmentDetails from '@/components/pages/tools/rateCalculator/domestic/ShipmentDetails'
import PickupLocation from '@/components/pages/tools/rateCalculator/domestic/PickupLocation'
import TermsAndConditions from '@/components/pages/tools/rateCalculator/TermsAndConditions'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ServiceableCourierPartners from '@/components/pages/tools/rateCalculator/domestic/ServiceableCourierPartners'

export const Route = createFileRoute(
  '/_authenticated/tools/rate-calculator/domestic/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [pickupPincode, setPickupPincode] = useState('')
  const [deliveryPincode, setDeliveryPincode] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  return (
    <div>
      <div className="flex gap-4 my-4">
        <ShipmentDetails
          setDeliveryPincode={setDeliveryPincode}
          setPickupPincode={setPickupPincode}
          setIsFormSubmitted={setIsFormSubmitted}
        />
        <PickupLocation
          pickupPincode={pickupPincode}
          deliveryPincode={deliveryPincode}
        />
      </div>
      {isFormSubmitted && <ServiceableCourierPartners />}

      <TermsAndConditions />
    </div>
  )
}
