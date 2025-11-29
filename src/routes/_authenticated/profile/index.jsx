import ErrorPage from "@/components/layout/ErrorPage";
import PageLayout from "@/components/layout/PageLayout";
import UserProfileCard from "@/components/pages/profile/UserProfileCard";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { useCurrentUserProfile } from "@/features/users/users.query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: RouteComponent,
});
function RouteComponent() {
  const { data, isLoading, isError, error } = useCurrentUserProfile();
  if (isError) {
    return <ErrorPage error={error} />;
  }
  return (
    <PageLayout>
      <ResponsiveCard loading={isLoading} title="Profile">
        <UserProfileCard data={data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
