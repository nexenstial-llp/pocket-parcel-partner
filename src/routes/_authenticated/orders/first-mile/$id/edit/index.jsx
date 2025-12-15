import PageLayout from "@/components/layout/PageLayout";
import EditQuickOrder from "@/components/pages/orders/quick/EditQuickOrder";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import {
  useGetQwqerOrderById,
  useModifyQwqerOrder,
} from "@/features/orders/orders.query";
import { updateQuickOrderSchema } from "@/features/orders/orders.schema";
import { applyZodErrorsToForm } from "@/utils/formError.util";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Form } from "antd";
import { message } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/orders/first-mile/$id/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: "false" });

  const {
    data: dataById,
    isLoading,
    isError,
    error,
  } = useGetQwqerOrderById(id);
  const data = dataById?.data?.data;

  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const weight = data?.weight_range?.split("-")[1];
      form.setFieldsValue({
        description: data?.description,
        from_name: data?.from_address?.name,
        from_phone: data?.from_address?.phone,
        from_landmark: data?.from_address?.landmark,
        from_house_number: data?.from_address?.house_number,
        from_latitude: data?.from_address?.latitude,
        from_longitude: data?.from_address?.longitude,
        from_address: data?.from_address?.address,

        to_name: data?.to_address?.name,
        to_phone: data?.to_address?.phone,
        to_landmark: data?.to_address?.landmark,
        to_house_number: data?.to_address?.house_number,
        to_latitude: data?.to_address?.latitude,
        to_longitude: data?.to_address?.longitude,
        to_address: data?.to_address?.address,
        weight: Number(weight),
      });
    }
  }, [data, form]);

  // ---- API SUBMIT MUTATION ----
  const { mutate: createOrderMutation, isPending } = useModifyQwqerOrder({
    onSuccess: () => {
      form.resetFields();
      message.success("Order created successfully");
      navigate({ to: "/orders/first-mile" });
    },
  });

  // ---- FINAL SUBMIT ----
  const handleFinish = (values) => {
    try {
      const payload = {
        description: values.description,
        order_key: data.order_key,
        from_name: values.from_name,
        from_phone: values.from_phone,
        from_address: values.from_address,
        from_landmark: values.from_landmark,
        from_latitude: Number(values.from_latitude),
        from_longitude: Number(values.from_longitude),
        from_house_number: values.from_house_number,

        to_name: values.to_name,
        to_phone: values.to_phone,
        to_address: values.to_address,
        to_landmark: values.to_landmark,
        to_latitude: Number(values.to_latitude),
        to_longitude: Number(values.to_longitude),
        to_house_number: values.to_house_number,

        special_instruction: values.special_instruction,
        weight: values.weight,
        merchant_order_amount: values.merchant_order_amount,
        payment_mode: values.payment_mode,
        promo_code: values.promo_code,
        item_type: values.item_type,
        item_type_comment: values.item_type_comment,

        pickup_time: dayjs(values.pickup_time).format("YYYY-MM-DD HH:mm:ss"),
      };
      const parsedData = updateQuickOrderSchema.parse(payload);

      createOrderMutation(parsedData);
    } catch (err) {
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        message.error("Fix the errors and try again.");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  if (isError) {
    return (
      <ErrorFallback title="Error while fetching the data" error={error} />
    );
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "First Mile", href: "/orders/first-mile" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard title="Edit First Mile Order">
        <EditQuickOrder
          form={form}
          handleFinish={handleFinish}
          isLoading={isLoading || isPending}
        />
      </ResponsiveCard>
    </PageLayout>
  );
}
