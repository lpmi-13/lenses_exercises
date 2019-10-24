import React from 'react';
import { Subscribe } from '../src/redux/components/Subscribe';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MESSAGE_LIMIT } from '../src/redux/util';

describe('the Subscribe component', () => {
    
    const clearMessages = jest.fn();
    const messages = [];
    const subscribe = jest.fn();
    const unsubscribe = jest.fn();
    const subscriptions = [];

    const defaultProps = {
        clearMessages,
        messages,
        subscribe,
        subscriptions,
        unsubscribe,
    }

    it('renders completely', () => {
      const tree = renderer.create(<Subscribe {...defaultProps} />).toJSON();
      expect(tree).toMatchSnapshot();        
    });

    it('clears all messages when Clear Messages is clicked', () => {
        const messages = ['this is a message', 'this is also a message'];
        const propsWithMessages = {...defaultProps, messages};
        const component = shallow(<Subscribe { ...propsWithMessages } />);
        expect(component.find('.number-of-messages').text()).toBe('Number of messages: 2');
        component.find('.clear-messages').simulate('click');
        expect(clearMessages).toHaveBeenCalled(); 
    });

    it('only shows messages up to the constant value set in utils', () => {
        const lotsOfMessages = Array(3000).fill('message');
        const propsWithLotsOfMessages = {...defaultProps, messages: lotsOfMessages};
        const component = shallow(<Subscribe {...propsWithLotsOfMessages } />);
        expect(component.find('.number-of-messages').text()).toBe(`Number of messages: ${lotsOfMessages.length}`);

        const tooManyMessages = Array(MESSAGE_LIMIT + 1).fill('message');
        component.setProps({ messages: tooManyMessages });
        expect(component.find('.number-of-messages').text()).toBe('Number of messages: 0');
    })
})