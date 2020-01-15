
const INITIAL_STATE = {
    messages: [],
    telemetry: [],   
}

export default (state = INITIAL_STATE, { type, value }) => {
    switch(type) {
        case 'ADD_RTC_MESSAGE': {
            return { 
                ...state,
                messages: [...state.messages, value ]
            }
        }
        case 'UPDATE_RESPONSE_TELEMETRY': {
            const { response, ...rest } = value;
            return {
                ...state,
                telemetry: [
                    ...state.telemetry,
                    rest
                ],
                messages: [
                    ...state.messages,
                    response
                ],
            }
        }
        case 'UPDATE_ACTIVE_TELEMETRY_TRACE': {
            return {
                ...state,
                latestTrace: value,
            }
        }
        
        default: {
            return state;
        }
    }
}