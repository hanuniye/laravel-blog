import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function RolePermissionMatrix({ roles = [], permissions = [] }) {
  // roles = [{id, name, permissions: [1,2,3]}]
  // permissions = [{id, name}]

  // Build state: {roleId: Set(permissionIds)}
  const initialState = {};
  roles.forEach((role) => {
    initialState[role.id] = new Set(role.permissions ?? []);
  });

  const [matrix, setMatrix] = useState(initialState);
  const { post, processing } = useForm();

  const togglePermission = (roleId, permId) => {
    const updated = new Set(matrix[roleId]);
    if (updated.has(permId)) updated.delete(permId);
    else updated.add(permId);

    setMatrix({ ...matrix, [roleId]: updated });
  };

  const handleSubmit = () => {
    // Convert matrix to {roleId: [permissionIds]}
    const data = {};
    Object.keys(matrix).forEach((roleId) => {
      data[roleId] = Array.from(matrix[roleId]);
    });

    post("/roles/permissions/update-matrix", { data });
  };

  return (
    <>
      <Head title="Role Permission Matrix" />
      <div className="overflow-auto">
        <Card>
          <CardContent className="p-4">
            <table className="table-auto border-collapse border border-gray-300 w-full text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Role</th>
                  {permissions.map((perm) => (
                    <th key={perm.id} className="border border-gray-300 p-2">
                      {perm.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td className="border border-gray-300 p-2 text-left">{role.name}</td>
                    {permissions.map((perm) => (
                      <td key={perm.id} className="border border-gray-300 p-2">
                        <Checkbox
                          checked={matrix[role.id].has(perm.id)}
                          onCheckedChange={() => togglePermission(role.id, perm.id)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <Button onClick={handleSubmit} disabled={processing}>
                Save All Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
