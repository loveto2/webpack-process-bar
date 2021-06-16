import { Modal, Spin, message } from 'antd';

function fixModalPrefixCls (fn) {
  return (option) =>
    fn({
      ...option,
      prefixCls: 'cmp-modal',
      okButtonProps: {
        ...option.okButtonProps,
        prefixCls: 'cmp-btn'
      },
      cancelButtonProps: {
        ...option.cancelButtonProps,
        prefixCls: 'cmp-btn'
      }
    });
}

Modal.confirm = fixModalPrefixCls(Modal.confirm);
Modal.error = fixModalPrefixCls(Modal.error);
Modal.info = fixModalPrefixCls(Modal.info);
Modal.success = fixModalPrefixCls(Modal.success);
Modal.warn = fixModalPrefixCls(Modal.warn);
Modal.warning = fixModalPrefixCls(Modal.warning);
Spin.defaultProps.delay = 200;
message.config({ duration: 5, prefixCls: 'cmp-message', top: 80 });
