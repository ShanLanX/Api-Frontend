import {ProColumns, ProFormInstance, ProTable} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type Prop = {
  values:API.InterfaceInfo;
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  columns: ProColumns<API.InterfaceInfo>[];
  visible: boolean;
};

const CreatModal: React.FC<Prop> = (props) => {
  // const intl = useIntl();
  const { values,visible, columns, onCancel, onSubmit } = props;
  const formRef=useRef<ProFormInstance>();

  // 监听values的变化
  useEffect(()=>{
    if(formRef){
      formRef.current?.setFieldsValue(values)
    }
  },[values])
  return (
    <Modal visible={visible}  footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default CreatModal;
