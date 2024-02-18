import renderer from 'react-test-renderer';
import {SampleAppTitle} from './AppTitle.tsx';
import {it,expect} from '@jest/globals';
import React from 'react';
it('component will render', () => {
  const component = renderer.create(
    <SampleAppTitle ></SampleAppTitle>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});