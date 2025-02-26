import { useCallback, useState } from 'react';
import { Button, Col, Divider, Dropdown, Menu, Row, message } from 'antd';
import { emit } from 'react-wonder-hooks';
import { StyledHeader } from '@/components/header.styles';
import UploadConfigForm from './uploadConfigForm';
import { Notify } from '@/common/constant';
import { inlineStyleOfHTML, solveImg } from '@/utils/copy';

export default () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setShowUploadDialog((v) => !v)}>
        图床设置
      </Menu.Item>
      <Menu.Item onClick={() => emit(Notify.FormatDoc)}>格式化文档</Menu.Item>
    </Menu>
  );

  const handleCopy = useCallback(() => {
    const textElem = document.createElement('textarea');
    const selection = window.getSelection();

    selection?.removeAllRanges();
    textElem.innerHTML = inlineStyleOfHTML();
    textElem.className = 'temporary-textarea';

    document.body.appendChild(textElem);

    // solveImg()

    // 选中 textarea 中的原生 html 标签
    selection?.selectAllChildren(textElem);

    document.execCommand('copy');
    message.success('复制成功');
    document.body.removeChild(textElem);
  }, []);

  return (
    <StyledHeader>
      <Row align="middle">
        <Col>
          <Dropdown overlay={menu}>
            <Button type="text" size="large">
              功能
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Button type="text" size="large" onClick={handleCopy}>
            复制
          </Button>
        </Col>
      </Row>
      <Divider />
      <UploadConfigForm
        visible={showUploadDialog}
        handleCancel={() => setShowUploadDialog((v) => !v)}
      />
    </StyledHeader>
  );
};
