/* eslint-disable react/prop-types */
import { useState, useMemo, useCallback } from "react";
import {
  Form,
  Input,
  Button,
  Collapse,
  Checkbox,
  Typography,
  Divider,
} from "antd";

const { Title, Text } = Typography;
function toTitleCase(str) {
  return (
    str
      // Insert space before capital letters
      .replace(/([A-Z])/g, " $1")
      // Capitalize the first character
      .replace(/^./, (s) => s.toUpperCase())
      .trim()
  );
}

const RoleForm = ({ permissionData, onSubmit }) => {
  const [form] = Form.useForm();
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const handlePermissionChange = useCallback(
    (moduleKey, childKey, checkedValues) => {
      setSelectedPermissions((prev) => ({
        ...prev,
        [moduleKey]: {
          ...(prev[moduleKey] || {}),
          [childKey]: checkedValues,
        },
      }));
    },
    []
  );

  const handleSelectAllModule = useCallback((moduleKey, children) => {
    setSelectedPermissions((prev) => {
      // Select all (set all child permissions)
      const newSelections = {};
      children.forEach((child) => {
        newSelections[child.key] = [...child.permissions];
      });
      return { ...prev, [moduleKey]: newSelections };
    });
  }, []);
  const handleUnselectAllModule = useCallback((moduleKey) => {
    setSelectedPermissions((prev) => {
      // Delete the module key
      const newSelections = { ...prev };
      delete newSelections[moduleKey];
      return newSelections;
    });
  }, []);

  const onFinish = useCallback(
    (values) => {
      // Transform selectedPermissions object into desired array format
      const formattedPermissions = Object.entries(selectedPermissions).map(
        ([moduleKey, childrenObj]) => ({
          key: moduleKey,
          children: Object.entries(childrenObj).map(
            ([childKey, permissionsArray]) => ({
              key: childKey,
              permissions: permissionsArray,
            })
          ),
        })
      );

      const payload = {
        name: values.roleName,
        description: values.description,
        permissions: formattedPermissions,
      };

      onSubmit(payload);
    },
    [selectedPermissions, onSubmit]
  );

  const permissionItems = useMemo(
    () =>
      permissionData.map((module) => ({
        key: module.key,
        label: (
          <div className="flex justify-between items-center">
            <Text className="capitalize font-semibold">
              {toTitleCase(module.key)}
            </Text>

            {selectedPermissions[module.key] &&
            Object.keys(selectedPermissions[module.key]).length ? (
              <Button
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnselectAllModule(module.key);
                }}
              >
                Unselect All
              </Button>
            ) : (
              <Button
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAllModule(module.key, module.children);
                }}
              >
                Select All
              </Button>
            )}
          </div>
        ),
        children: (
          <>
            {module.children.map((child) => (
              <div
                key={child.key}
                className="mb-4 grid grid-cols-12 gap-4 border-b pb-2"
              >
                <div className="col-span-2">
                  <Text strong className="capitalize ">
                    {toTitleCase(child.key)}
                  </Text>
                </div>
                <div className="col-span-8">
                  <Checkbox.Group
                    className="block mt-2"
                    value={selectedPermissions[module.key]?.[child.key] || []}
                    options={child.permissions.map((p) => ({
                      label: <span>{p?.split("_").join(" ")}</span>,
                      value: p,
                    }))}
                    onChange={(checkedValues) =>
                      handlePermissionChange(
                        module.key,
                        child.key,
                        checkedValues
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </>
        ),
      })),
    [
      permissionData,
      selectedPermissions,
      handleSelectAllModule,
      handlePermissionChange,
      handleUnselectAllModule,
    ]
  );

  return (
    <div>
      <Title level={4}>Create Role</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-4 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Form.Item
            name="roleName"
            label="Role Name"
            rules={[{ required: true, message: "Role name is required" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item
            className="col-span-2"
            name="description"
            label="Description"
          >
            <Input placeholder="Enter role description (optional)" />
          </Form.Item>
        </div>
        <Divider style={{ margin: "12px 0px" }} />
        <Title level={5}>Assign Permissions</Title>
        <Collapse
          size="small"
          accordion
          className="bg-white"
          items={permissionItems}
        />
        <div className="text-right mt-6">
          <Button type="primary" htmlType="submit">
            Create Role
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RoleForm;
