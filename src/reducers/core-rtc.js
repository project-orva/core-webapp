export default (state = {messages: []}, { type, value }) => {
    switch(type) {
        case 'ADD_MESSAGE': {
            return { 
                ...state,
                messages: [...state.messages, value ]
            }
        }
        default: {
            return state;
        }
    }
}