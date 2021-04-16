import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { shallow } from 'enzyme';
import Title from './Title';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


const title = 'Test Title';
const wrapper = shallow(<Title title={title} />);
const wrapper2 = shallow(<Title count={3} />)

describe('Title', () => {
  it('Snapshot test for title', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('snapshot test for title 2', () => {
    expect(wrapper2).toMatchSnapshot();
  })

  it('Interaction test for title', () => {
    expect(
      wrapper
      .find('h1')
      .text()
    ).toEqual(title);
  });
});