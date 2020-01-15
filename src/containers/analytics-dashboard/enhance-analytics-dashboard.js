import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    ({ servicesHealth: { services } }) => ({ servicesHealth: services }), 
    {
        establishServiceHealthSocket: () => ({
          type: 'ESTABLISH_SERVICE_HEALTH_SOCKET'
        }),
    }
  ),  
  lifecycle({
    componentDidMount() {
      this.props.establishServiceHealthSocket();
    }
  })
);