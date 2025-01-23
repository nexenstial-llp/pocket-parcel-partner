import { Card } from "antd";
import React from "react";

const TermsAndConditions = () => {
  return (
    <Card>
      <h6>Terms and Conditions</h6>
      <ul className="list-disc ml-4 text-gray-700">
        <li>
          Freight charges (GST inclusive) are based on the higher dead/dry or
          volumetric weight. RTO (return to origin) shipment will be charged
          differently from the forward delivery rate. <br /> Note: The standard
          courier RTO charge will also apply to their additional weight courier
          type.
        </li>
        <li>
          Fixed COD charge or COD % of the order value whichever is higher will
          be taken while calculating the COD fee.
        </li>
        <li>
          Volumetric weight is calculated as LxBxH/5000 for most couriers except
          Aramex. It is LxBxH/6000 for Aramex. Measurements (length, breadth,
          height) should be in centimeters.
        </li>
        <li>
          The maximum liability, if any, is limited to whatever compensation the
          logistics partner offers to Company in event of a claim by the
          Merchant, provided such a claim is raised by the Merchant within one
          (1) month from the date of such damage or loss or theft.
        </li>
        <li>Detailed terms and conditions can be reviewed on</li>
        <li>For queries, write us on </li>
      </ul>
    </Card>
  );
};

export default TermsAndConditions;
