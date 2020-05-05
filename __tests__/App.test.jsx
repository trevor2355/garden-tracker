import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';
import { TestScheduler } from 'jest';

describe('Unit Tests', () => {
  test('should render the app component into the DOM', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  })
})