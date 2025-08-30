import { Modal } from '../modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type CategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
    return (
        <Modal description="test desc" title="title" isOpen={isOpen} onClose={onClose}>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                </div>
                <Button onClick={onClose}>Colse</Button>
            </div>
        </Modal>
    );
}
