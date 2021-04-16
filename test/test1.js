import React from 'react';
import AboutMe from './../../src/bundles/aboutMeComponent';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Button } from 'native-base';
import { LoginActions } from 'pgm-base';
const middleWares = [];
const mockStore = configureStore(middleWares);

const initialState = {
  login: {
    aboutMe: {
      aboutMeError: false,
      aboutMeErrorMessage: '',
      pending: false,
    },
    LoggedInUser: {
      about_me: '',
    },
  },
};

test('Clicking on Cancel Button Must call goBack()', async () => {
  const store = mockStore(initialState);
  const goBackFunc = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <AboutMe navigation={{ goBack: goBackFunc }} />
    </Provider>
  );
  const btn = wrapper.findWhere(
    node => node.prop('leftTestId') === 'LeftButton'
  );
  await btn
    .at(0)
    .props()
    .onPress();
  expect(goBackFunc).toHaveBeenCalledTimes(1);
});

test('empty form must fail', async () => {
  const store = mockStore(initialState);
  const goBackFunc = jest.fn();
  LoginActions.editAboutMe = jest.fn().mockReturnValue({ type: 'nothing' });
  const wrapper = mount(
    <Provider store={store}>
      <AboutMe navigation={{ goBack: goBackFunc }} />
    </Provider>
  );
  const btn = wrapper.findWhere(n => n.prop('rightTestId') === 'RightButton');
  await btn
    .at(0)
    .props()
    .onPress();

  expect(LoginActions.editAboutMe).toHaveBeenCalledTimes(0);
});

test('filled form must pass', async () => {
  const store = mockStore(initialState);
  const goBackFunc = jest.fn();
  LoginActions.editAboutMe = jest.fn().mockReturnValue({ type: 'nothing' });
  const wrapper = mount(
    <Provider store={store}>
      <AboutMe navigation={{ goBack: goBackFunc }} />
    </Provider>
  );
  const Input = wrapper.find('Input');
  Input.at(0)
    .props()
    .onChangeText('Dummy Text');

  const btn = wrapper.findWhere(n => n.prop('rightTestId') === 'RightButton');
  await btn
    .at(0)
    .props()
    .onPress();

  expect(LoginActions.editAboutMe).toHaveBeenCalledTimes(1);
});
