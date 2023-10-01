import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';
import './index.scss';

export type UploadAvtCircle = {
    onChange?: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
    customRequest?: any;
    previewImage?: string;
};
export const UploadAvtCircle = ({
    onChange,
    customRequest = () => {},
    previewImage,
}: UploadAvtCircle) => {
    return (
        <Upload
            className="upload-avt"
            showUploadList={false}
            onChange={onChange}
            customRequest={customRequest}
        >
            <div className="upload-container">
                <img src={previewImage} alt="" className="avt-img" />
                <PlusOutlined className="upload-icon" />
                <div className="upload-text">Avatar</div>
            </div>
        </Upload>
    );
};
