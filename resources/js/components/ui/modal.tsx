import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ModalProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function Modal({ children, description, isOpen, onClose, title }: ModalProps) {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
}
