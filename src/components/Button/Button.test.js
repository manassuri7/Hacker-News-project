import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Button from './Button.jsx';

describe('Button', () => {
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Button>More</Button>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
