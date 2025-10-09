import { useState } from "react";
import { BsEye } from "react-icons/bs";
// Components

import InputTag from "@/components/ui/formFields/InputTag";
import { Button } from "antd";
const InvoiceSequence = () => {
  const [channel, setChannel] = useState("");
  const [startingNumber, setStartingNumber] = useState("");
  const [pattern, setPattern] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ channel, startingNumber, pattern });
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 divide-x-2 max-w-6xl mx-auto p-4 max-h-[600px] overflow-y-auto">
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="channel">Select Channel</label>
              <select name="channel" id="channel">
                <option value={"channel1"}>Channel 1</option>
                <option value={"channel2"}>Channel 2</option>
                <option value={"channel3"}>Channel 3</option>
              </select>
            </div>
            <div className="space-y-2">
              <InputTag
                label={"Sequence Starting Number"}
                id={"startingNumber"}
                value={startingNumber}
                onChange={(e) => setStartingNumber(e.target.value)}
                placeholder="e.g. 7"
              />
              <p className="text-sm text-muted-foreground">
                Leave empty if you want to start from '0'
              </p>
            </div>
            <div className="space-y-2">
              <InputTag
                label={"Invoice Sequence Pattern"}
                id={"pattern"}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="e.g. INV-{seq}-{dd}-{yyyy}-invoice"
              />
              <p className="text-sm text-muted-foreground">
                Enter Input Sequence according to the guidelines. Add hyphen(-)
                between the inputs
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BsEye className="w-5 h-5" />
                <h3 className="font-medium">Pattern Result</h3>
              </div>
              <div className="p-4 bg-muted rounded-md">
                {pattern || "Pattern preview will appear here"}
              </div>
            </div>
          </form>
        </div>
        <div className="lg:w-[400px] p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-2">
              <h2 className="text-xl font-semibold">Guidelines</h2>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Sequence Tags</h3>
              <p className="text-sm text-muted-foreground">
                Add tags mentioned below in curly brackets only. Tags which do
                not follow the allowed pattern will be considered as Strings
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {"{seq}"}
                  </code>
                  <p className="text-sm text-muted-foreground">
                    This is the Sequential Number that will increment with every
                    invoice. It will start with zero unless you specify a
                    different value in the Starting Sequence Number field.
                  </p>
                </div>

                <div className="space-y-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {"{dd}"}
                  </code>
                  <p className="text-sm text-muted-foreground">
                    This is the current day, e.g. 23,13,31 etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {"{mm}"}
                  </code>
                  <p className="text-sm text-muted-foreground">
                    This is the current month, e.g. 2, 12 etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {"{yyyy}"}
                  </code>
                  <p className="text-sm text-muted-foreground">
                    This is the current year, e.g. 2013, 2014 etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <p>
                <strong> Example 1</strong>
              </p>
              <p>
                {" "}
                If you set the sequence pattern to AY17/18-{"seq"} and starting
                sequence number to be 34, then the first invoice number will be
                AY17/18-00034
              </p>
            </div>

            <div className="">
              <p>
                <strong> Example 2 </strong>
              </p>
              <p>
                If you set the sequence pattern to {"seq"}-{"mm"}-{"dd"} and
                starting sequence number to be 1, then the first invoice number
                will be 00001-12-17 if 17th December is the date of creation of
                the invoice
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 border-t pt-4 border-gray-200">
        <Button type="primary" danger>
          Cancel
        </Button>
        <Button type="primary">Create New Sequence</Button>
      </div>
    </>
  );
};
export default InvoiceSequence;
