/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";

const NewTemplate = ({ handleOk, handleCancel }) => {
  const [templateName, setTemplateName] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const PreviewInvoice = () => (
    <div className="bg-white border p-6 rounded-lg space-y-6 w-full">
      <div>
        <h2 className="text-xl font-semibold">Tax Invoice</h2>
        <div className="text-sm text-gray-600">
          <div>Invoice No: INV-0002</div>
          <div>Date: 2022-5-12 18:50:50</div>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">BILL FROM</h3>
        <div className="text-sm">
          <div>Bugs</div>
          <div>11, Maple Street</div>
          <div>Werner Avenue</div>
          <div>San Fransisco- 119911, California, IN</div>
          <div>Email: bugs@noone.com</div>
        </div>
      </div>

      <hr />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">SHIPPING ADDRESS</h3>
          <div className="text-sm">
            <div>Bat Man</div>
            <div>109, Wayne Manor</div>
            <div>Arkham Avenue</div>
            <div>Gotham, New York - N3879</div>
            <div>Email: im@batman.com</div>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">BILLING ADDRESS</h3>
          <div className="text-sm">
            <div>Bat Man</div>
            <div>109, Wayne Manor</div>
            <div>Arkham Avenue</div>
            <div>Gotham, New York - N3879</div>
            <div>Email: im@batman.com</div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h3 className="font-medium mb-2">ORDER DETAILS</h3>
        <div className="text-sm">
          <div>Sales Number: SO-10000</div>
          <div>AWB Number: 123456789</div>
          <div>Sale Date: 2022-5-12 18:34:50</div>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item Description</th>
            <th className="text-left py-2">SKU Code</th>
            <th className="text-left py-2">Qty</th>
            <th className="text-left py-2">Rate</th>
            <th className="text-left py-2">Disc</th>
            <th className="text-left py-2">Taxable</th>
            <th className="text-left py-2">Tax</th>
            <th className="text-left py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Acme Sneeze Powder</td>
            <td></td>
            <td>10</td>
            <td>INR 12</td>
            <td>INR 1</td>
            <td>INR 90.9</td>
            <td>INR 10</td>
            <td>INR 110</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right">
        <div className="text-sm">
          <div>Discount: INR 10</div>
          <div className="font-medium">Total: INR 110</div>
        </div>
      </div>

      <div className="text-sm">
        <div>Payment Type</div>
        <div>Prepaid</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex gap-4">
        <div className="">
          <div className="space-y-6">
            <div className="space-y-6 border rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select className="w-full rounded-md border border-gray-300 p-2">
                    <option>Standard A4 Template</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="Template Name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Input
                  placeholder="Select Channel"
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="default"
                  id="default"
                  className="min-h-4 min-w-4"
                />
                <label htmlFor="default" className="text-sm">
                  Make this as default invoice template for selected channels
                </label>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="space-y-4">
                <h3 className="font-medium">Customer Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="namePhoneEmail"
                      id="namePhoneEmail"
                      className="size-4"
                    />
                    <label htmlFor="namePhoneEmail" className="text-sm">
                      Name, Phone, Email
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="billingAddress"
                      id="billingAddress"
                      className="size-4"
                    />
                    <label htmlFor="billingAddress" className="text-sm">
                      Billing Address
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="shippingAddress"
                      id="shippingAddress"
                      className="size-4"
                    />
                    <label htmlFor="shippingAddress" className="text-sm">
                      Shipping Address
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="taxId"
                      id="taxId"
                      className="size-4"
                    />
                    <label htmlFor="taxId" className="text-sm">
                      Tax Identification Number
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="skuName"
                      id="skuName"
                      className="size-4"
                    />
                    <label htmlFor="skuName" className="text-sm">
                      SKU name as single line
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="skuCode"
                      id="skuCode"
                      className="size-4"
                    />
                    <label htmlFor="skuCode" className="text-sm">
                      SKU code
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="itemTaxes"
                      id="itemTaxes"
                      className="size-4"
                    />
                    <label htmlFor="itemTaxes" className="text-sm">
                      Individual item taxes
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PreviewInvoice />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button type="primary" danger onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleOk}>
          Create New Template
        </Button>
      </div>
    </div>
  );
};

export default NewTemplate;
