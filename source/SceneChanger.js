import React from 'react';
import { View, Environment, asset } from 'react-360';
import ViewScene from './ViewScene';
import DisplayInfo from './DisplayInfo';


export default class SceneChanger extends React.Component {
  state = {
    currentSceneId: this.props.firstId,
  };

  componentDidMount() {
    this.updateScene({});
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScene(prevState);
  }

  updateScene = (prevState) => {
    if (prevState.currentSceneId === this.state.currentSceneId) return;

    const currentScene = this.getCurrentScene();
    Environment.setBackgroundImage(asset(currentScene.img));
  };

  getCurrentScene = () => {
    return this.getSceneById(this.state.currentSceneId);
  };

  getSceneById = (sceneId) => {
    return this.props.scenes.find((scene) => scene.sceneId === sceneId);
  };

  handleSceneClick = (sceneToGo) => {
    this.setState({ currentSceneId: sceneToGo.sceneId });
  };

  renderScene = (scenes = []) => {
    return scenes.map((Scene, i) => {
      switch (Scene.type) {
        case 'scene': {
          const sceneToGo = this.getSceneById(Scene.sceneId);
          return (
            <ViewScene
              key={i.toString()}
              onClick={() => this.handleSceneClick(sceneToGo)}
              text={Scene.text}
              left={Scene.left}
              top={Scene.top}
            />
          );
        }
        case 'info': {
          return (
            <DisplayInfo
              key={i.toString()}
              text={Scene.text}
              left={Scene.left}
              top={Scene.top}
            />
          );
        }
        default:
          return null;
      }
    });
  };

  render() {
    const currentScene = this.getCurrentScene();

    return (
      <View style={{ flex: 1 }}>
        {this.renderScene(currentScene.scenes)}
      </View>
    );
  }
}
