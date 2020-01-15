import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { isEmpty } from 'lodash';

export default compose(
    connect(
        ({ coreRTC: { messages, telemetry, latestTrace }, creds: { id: uid, ssid } }) => ({
            latestTrace,
            messages,
            ssid,
            uid,
            telemetry
    }),
        {
            addMessage: (payload) => ({
                type: 'SOCK_RTC_MESSAGE',
                payload,
            }),
            establishRtcConnection: () => ({
                type: 'ESTABLISH_RTC_CONNECTION'
            }),
            updateActiveTrace: (value) => ({
                type: 'UPDATE_ACTIVE_TELEMETRY_TRACE',
                value,
            })
        }
    ),
    withProps(({ uid, ssid }) => ({
        chatName: `chat-${uid}_${ssid}`
    })),
    withState('messageInput', 'setMessageInput', ''),
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
        handleMessageSelection: ({ updateActiveTrace, telemetry }) => telemetryID => {
            const currentServiceTrace = telemetry.find(({ trace: {id} }) => id === telemetryID);
            updateActiveTrace(currentServiceTrace.trace);
        }
    }),
    lifecycle({
        componentDidMount() {            
            this.props.establishRtcConnection();           
        }
    }),
    withProps(({ telemetry }) => ({
        telemetry: telemetry.filter(t => !isEmpty(t))
    }))
);
