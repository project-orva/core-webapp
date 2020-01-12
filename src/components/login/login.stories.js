import React from 'react';

import Login from './index';

export default {
  title: 'Login',
};

export const populateMessages = () => <Login />;
populateMessages.story = {
  name: 'Login View',
};