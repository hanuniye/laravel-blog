import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';

interface AlertModelProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const AlertModel = ({ isOpen, loading, onClose, onConfirm }: AlertModelProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal title="Are you sure?" description="This action is done." isOpen={isOpen} onClose={onClose}>
            <div className="flex w-full items-center justify-end space-x-5 pt-2">
                <Button variant="outline" disabled={loading} onClick={onClose}>
                    Cencel
                </Button>
                <Button variant="destructive" disabled={loading} onClick={onConfirm}>
                    Done
                </Button>
            </div>
        </Modal>
    );
};

export default AlertModel;
