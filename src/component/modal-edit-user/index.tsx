import { Modal, Upload } from 'antd';
import React from 'react';
import { FormEditUser } from './form-edit-user';

export type ModalEditUser = {
    open?: boolean;
    onCancel?: (event: any) => void;
};
export const ModalEditUser = ({ open, onCancel }: ModalEditUser) => {
    return (
        <Modal
            title="Edit User Profile"
            open={open}
            onCancel={onCancel}
            footer={[]}
            className="edit-modal"
        >
            <FormEditUser onCancel={onCancel} open={open} />
        </Modal>
    );
};
