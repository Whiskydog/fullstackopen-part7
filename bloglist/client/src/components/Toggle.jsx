import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';

const Toggle = forwardRef(({ label, children }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({ toggle: () => setVisible(!visible) }));

  return visible ? (
    <Segment>
      {children}
      <Button color="red" onClick={() => setVisible(false)}>
        Cancel
      </Button>
    </Segment>
  ) : (
    <Button color="green" onClick={() => setVisible(true)}>
      {label}
    </Button>
  );
});

Toggle.displayName = 'Toggle';
Toggle.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Toggle;
