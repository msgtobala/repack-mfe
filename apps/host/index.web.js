import {AppRegistry} from 'react-native';
import name from './app.json';
import AppContainer from './src/common/AppContainer';

AppRegistry.registerComponent(name, () => AppContainer);

AppRegistry.runApplication(name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
