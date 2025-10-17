/* eslint-disable react/prop-types */

import { usePermissions } from "@/hooks/usePermissions";

export function PermissionGuard({
  children,
  roles = [],
  permissions = [],
  requireAll = false,
  fallback = null,
}) {
  const { hasAnyRole, hasAnyPermission, hasRole, hasPermission } =
    usePermissions();

  const hasRequiredRoles =
    roles.length === 0 ||
    (requireAll ? roles.every((role) => hasRole(role)) : hasAnyRole(roles));

  const hasRequiredPermissions =
    permissions.length === 0 ||
    (requireAll
      ? permissions.every((permission) => hasPermission(permission))
      : hasAnyPermission(permissions));

  if (hasRequiredRoles && hasRequiredPermissions) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
