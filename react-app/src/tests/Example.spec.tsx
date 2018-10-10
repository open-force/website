import App from '@src/app';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

configure({ adapter: new Adapter() });

it('test', () => {
  const mockCallback = jest.fn();
  // Use the method 'mount' to perform a full render
  const todoItem = mount((
    <App />
  ));

  const btn = todoItem.find('Card');
  expect(btn.prop('title')).not.toBeNull();
});
