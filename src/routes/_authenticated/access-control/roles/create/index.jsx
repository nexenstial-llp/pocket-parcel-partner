import PageLayout from "@/components/layout/PageLayout";
import RoleForm from "@/components/pages/access-control/roles/RoleForm";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { permissionsJson } from "@/utils/permissions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/access-control/roles/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = (data) => {
    console.log("Role created:", data);
  };
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Access Control", href: "/access-control/users" },
        { title: "Create Roles" },
      ]}
    >
      <ResponsiveCard title="Create new role">
        <RoleForm permissionData={permissionsJson} onSubmit={handleSubmit} />
      </ResponsiveCard>
    </PageLayout>
  );
}
