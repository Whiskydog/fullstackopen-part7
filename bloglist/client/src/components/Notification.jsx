import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';

const Notification = () => {
  const { type, content, visible } = useSelector((state) => state.notification);

  if (!visible) return null;

  return (
    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
      <Message compact {...{ [type]: true }}>
        {content}
      </Message>
    </div>
  );
};

export default Notification;
