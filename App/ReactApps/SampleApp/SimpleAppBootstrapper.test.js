import { expect, test } from '@jest/globals';
import React from 'react';
import Layout from './Layout/Layout';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({adapter: new Adapter()});
test('app render', () => {

    const layout = Enzyme.shallow( <Layout></Layout>);
    expect(layout.find('.sample-app')).toHaveLength(1);
});