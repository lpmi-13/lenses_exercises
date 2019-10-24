import { Action } from '../src/redux/actions';
import { Type as KafkaType } from 'redux-lenses-streaming'
import { INITIAL_STATE, sessionReducer } from '../src/redux/reducers/sessionReducer';

describe('the session reducer', () => {

    it('should return the state if action is undefined', () => {
        expect(sessionReducer(INITIAL_STATE, undefined)).toEqual(INITIAL_STATE);
    });

    it('should add an additional message to the existing array', () => {
        const messages = ['these are important', 'messages to read'];
        const stateWithTwoMessages = { ...INITIAL_STATE, messages };

        // now lets add a third message
        const thirdMessage = 'here is a third message';
        const stateWithThreeMessages = { ...stateWithTwoMessages, messages: messages.concat(thirdMessage)}
        const kafkaMessageAction = {
            type: KafkaType.KAFKA_MESSAGE,
            payload: {
                content: thirdMessage
            }
        }
        expect(sessionReducer(stateWithTwoMessages, kafkaMessageAction)).toEqual(stateWithThreeMessages);
    })

    it('should clear all messages', () => {
        const messages = ['blah', 'blah', 'blah'];
        const stateWithMessages = {...INITIAL_STATE, messages }
        expect(sessionReducer(stateWithMessages, Action.clearMessages())).toEqual(INITIAL_STATE);
    })
})