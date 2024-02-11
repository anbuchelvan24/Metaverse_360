import React from 'react';

import SceneChanger from './SceneChanger.js';
import config from './info.json';

export default class App extends React.Component {
  render() {
    return (
      <SceneChanger
        scenes={config.scenes}
        firstId={config.default.firstId}
      />
    );
  }
}
