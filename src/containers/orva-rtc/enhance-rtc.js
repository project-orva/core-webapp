import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { isEmpty } from 'lodash';

export default compose(
    connect(
        ({ coreRTC: { messages, telemetry }, creds: { id: uid, ssid } }) => ({ messages, ssid, uid, telemetry}),
        {
            addMessage: (payload) => ({
                type: 'SOCK_RTC_MESSAGE',
                payload,
            }),
            establishRtcConnection: () => ({
                type: 'ESTABLISH_RTC_CONNECTION'
            }),
        }
    ),
    withProps(({ uid, ssid }) => ({
        chatName: `chat-${uid}_${ssid}`
    })),
    withState('messageInput', 'setMessageInput', ''),
    withState('currentTrace', 'setCurrentTrace', {}),
    withState('serviceTrace', 'setServiceTrace', {}),
    withHandlers({
        submitMessage: ({ messageInput, setMessageInput, addMessage, ssid, uid }) => (event) => {
            if (event.charCode !== 13) {
                return;
            }

            addMessage({
                request: messageInput,
                did: ssid,
                uid,
            });

            setMessageInput('');
        },
        updateMessageInput: ({ setMessageInput }) => ({ target: { value } }) => {
            setMessageInput(value);
        },
        updateServiceTrace: ({ setServiceTrace }) => serviceTrace => {
            setServiceTrace(serviceTrace);
        },
        handleMessageSelection: () => message => {
            console.log(message)
        }
    }),
    lifecycle({
        componentDidMount() {
            const { telemetry, setCurrentTrace, establishRtcConnection } = this.props;
            
            establishRtcConnection();
            if(telemetry.length > 0) {
                setCurrentTrace(telemetry[telemetry.length -1])
            }
        }
    }),
    withProps(({ telemetry }) => ({
        telemetry: telemetry.filter(t => !isEmpty(t))
    }))
);
