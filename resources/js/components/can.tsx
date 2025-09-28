import { usePermission } from "@/hooks/use-permission";

type CanProps = {
    permission: string;
    children: React.ReactNode
}

export function Can({ permission, children }: CanProps) {
    const { hasPermission } = usePermission();
    return hasPermission(permission) ? children : null;
}
