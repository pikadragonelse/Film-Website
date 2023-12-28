import { Modal } from 'antd';
import React from 'react';

export type ModalNotify = { isOpen?: boolean; onCancel?: (props?: any) => void };
export const ModalNotify = ({ isOpen, onCancel }: ModalNotify) => {
    return <Modal open={isOpen} onCancel={onCancel}></Modal>;
};
