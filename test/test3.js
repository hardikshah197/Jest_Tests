import React from 'react';
import FilterModal from '../../src/bundles/ListingSearchComponent/FilterModal';
import ListingSearchComponent from '../../src/bundles/ListingSearchComponent';
import { FlagsProvider } from 'react-feature-flags';
import flags from './../../src/featureFlags/flags';

import configureStore from 'redux-mock-store';
const middleWares = [];
const mockStore = configureStore(middleWares);
import { mount } from 'enzyme';
import SearchBarComponent from '../../src/bundles/ListingSearchComponent/SearchBarComponent';
import { Provider } from 'react-redux';
test('Filter Modal with on and off', () => {
  const processFilterChange = jest.fn();
  const wrapper = mount(
    <FilterModal
      max={1500}
      processFilterChanges={processFilterChange}
      show={false}
      updateModalState={jest.fn()}
    />
  );
  wrapper
    .find('Button')
    .at(0)
    .props()
    .onPress();
  expect(processFilterChange.mock.calls.length).toBe(1);
  wrapper
    .find('Switch')
    .at(0)
    .props()
    .onValueChange(true);
  expect(processFilterChange.mock.calls.length).toBe(1);
  wrapper
    .find('Switch')
    .at(0)
    .props()
    .onValueChange(true);

  expect(wrapper.state('utilitiesIncluded')).toBe(true);
  expect(wrapper.state('priceNegotiable')).toBe(false);
  wrapper
    .find('Switch')
    .at(1)
    .props()
    .onValueChange(true);
  expect(wrapper.state('priceNegotiable')).toBe(true);
  wrapper
    .find('MultiSlider')
    .at(0)
    .props()
    .onValuesChange([20, 30]);
  expect(wrapper.state('priceFrom')).toBe(20);
  expect(wrapper.state('priceTo')).toBe(30);
  wrapper
    .find('Modal')
    .at(0)
    .props()
    .onRequestClose();
  expect(processFilterChange.mock.calls.length).toBe(2);
});

test('main component', () => {
  const initialState = {
    login: {
      loggedIn: true,
      LoggedInUser: {
        roles: ['searcher', 'owner'],
      },
      changeRole: {
        pending: false,
      },
    },
    searchListing: {
      error: false,
      errorMessage: '',
      pending: false,
      listingList: [],
      processChange: jest.fn(),
    },
    defaultSearchListing: {
      listingList: [],
      pending: false,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <FlagsProvider value={flags}>
        <ListingSearchComponent />
      </FlagsProvider>
    </Provider>
  );
  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .props().error
  ).toBe(false);
  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .state('modalVisible')
  ).toBe(false);
  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .state('cardView')
  ).toBe(true);
  const btn = wrapper.find('Button');
  btn
    .at(0)
    .props()
    .onPress();
  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .state('cardView')
  ).toBe(true);
  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .state('modalVisible')
  ).toBe(true);
});

test('submitSearch must be called for text search for listing', () => {
  const props = {
    cardView: true,
    setCardView: jest.fn(),
    updateModalState: jest.fn(),
    pending: false,
  };
  const searchSubmit = jest.fn();
  const searchBarUpdateState = jest.fn();
  const wrapper = mount(
    <FlagsProvider value={flags}>
      <SearchBarComponent
        searchSubmit={searchSubmit}
        searchBarUpdateState={searchBarUpdateState}
        {...props}
      />
    </FlagsProvider>
  );
  const Input = wrapper.find('SearchBar');
  Input.at(0)
    .props()
    .onChangeText('dummy search');
  Input.at(0)
    .props()
    .onEndEditing();
  expect(searchSubmit).toBeCalled();
});

test('submitSearch must not be called for empty text search for listing', () => {
  const props = {
    cardView: true,
    setCardView: jest.fn(),
    updateModalState: jest.fn(),
    pending: false,
  };
  const searchSubmit = jest.fn();
  const searchBarUpdateState = jest.fn();
  const wrapper = mount(
    <FlagsProvider value={flags}>
      <SearchBarComponent
        searchSubmit={searchSubmit}
        searchBarUpdateState={searchBarUpdateState}
        {...props}
      />
    </FlagsProvider>
  );
  const Input = wrapper.find('SearchBar');
  Input.at(0)
    .props()
    .onChangeText('');
  Input.at(0)
    .props()
    .onEndEditing();
  expect(searchSubmit.mock.calls.length).toBe(0);
});
