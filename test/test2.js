import React from 'react';
import { shallow } from 'enzyme';
import BackComponent from '../../src/core/BackComponent/BackComponent';

test('must able to press back button and go back', () => {
  const goBackFunc = jest.fn();
  const wrapper = shallow(
    <BackComponent navigation={{ goBack: goBackFunc }} />
  );
  const goBackButton = wrapper.findWhere(
    node => node.prop('testID') === 'goBackButton'
  );
  goBackButton
    .at(0)
    .props()
    .onPress();
  expect(goBackFunc).toHaveBeenCalled();
});
