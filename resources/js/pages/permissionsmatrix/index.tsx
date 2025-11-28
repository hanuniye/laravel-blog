import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'PermissionsMatrix',
        href: '/roles-permissions',
    },
];

type RolePermissionMatrix = {
    roleId: number;
    permissions: number[];
};

interface PermissionsMatrixProps extends PageProps {
    roles: {
        id: number;
        name: string;
        permissions: {
            id: number;
        }[];
    }[];
    permissions: {
        id: number;
        name: string;
    }[];
}

export default function PermissionsMatrix({ roles, permissions, flash: { success } }: PermissionsMatrixProps) {
    const { data, setData, post, processing } = useForm<{
        matrix: RolePermissionMatrix[];
    }>({
        matrix: roles.map((role) => ({
            roleId: role.id,
            permissions: role.permissions.map((p) => p.id), // existing permissions for that role
        })),
    });

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const togglePermission = (roleId: number, permissionId: number, checked: boolean | 'indeterminate') => {
        setData(
            'matrix',
            data.matrix.map((r) =>
                r.roleId === roleId
                    ? {
                          ...r,
                          permissions: checked === true ? [...r.permissions, permissionId] : r.permissions.filter((id) => id !== permissionId),
                      }
                    : r,
            ),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('roles.permissions.update'), {
            onError: () => {
                toast.error('error occured');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-xl font-semibold">Role Permissions</h1>

                    <div className="overflow-x-auto">
                        <Table className="min-w-[700px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left">Permission</TableHead>
                                    {roles.map((role) => (
                                        <TableHead key={role.id} className="text-center capitalize">
                                            {role.name}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissions.map((p) => (
                                    <TableRow key={p.id} className="hover:bg-gray-50">
                                        <TableCell>{p.name}</TableCell>
                                        {roles.map((role) => {
                                            const roleData = data.matrix.find((r) => r.roleId === role.id);
                                            return (
                                                <TableCell key={role.id} className="text-center">
                                                    <Checkbox
                                                        className="border-gray-400"
                                                        checked={roleData?.permissions.includes(p.id) ?? false}
                                                        onCheckedChange={(checked) => togglePermission(role.id, p.id, checked)}
                                                    />
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Button type="submit" disabled={processing}>
                        Save Changes
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
