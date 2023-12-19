import { Modal } from 'antd';
import { ReactNode } from 'react';

export type ModalUser = {
    open?: boolean;
    onCancel?: (event: any) => void;
    children?: ReactNode;
};
export const ModalUser = ({ open, onCancel, children }: ModalUser) => {
    return (
        <Modal
            title="Edit User Profile"
            open={open}
            onCancel={onCancel}
            footer={[]}
            className="edit-modal"
        >
            {children}
        </Modal>
    );
};
