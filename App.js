import React from 'react';
import {
  Animated,
  Image,
  MaskedViewIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Asset, AppLoading } from 'expo';

export default class App extends React.Component {
  state = {
    value: new Animated.Value(1),
    loaded: false,
  };

  componentDidMount() {
    this._animateIn();
  }

  _animateIn = () => {
    Animated.timing(this.state.value, { toValue: 0, duration: 1000 }).start(
      () => {
        setTimeout(() => {
          this._animateOut();
        }, 500);
      }
    );
  };

  _animateOut = () => {
    Animated.timing(this.state.value, { toValue: 1, duration: 1000 }).start(
      () => {
        setTimeout(() => {
          this._animateIn();
        }, 500);
      }
    );
  };

  _loadImages = async () => {
    await Asset.fromModule(require('./assets/back-icon-mask.png')).downloadAsync();
    await Asset.fromModule(require('./assets/back-icon.png')).downloadAsync();
  }

  render() {
    if (!this.state.loaded) {
      return (
        <AppLoading
          startAsync={this._loadImages}
          onError={console.warn}
          onFinish={() => this.setState({ loaded: true })}
        />
      );
    }

    const translateX = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -200],
    });

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ width: 375, height: 44, backgroundColor: '#eee' }}>
          <MaskedViewIOS
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
            }}
            maskElement={
              <Image source={require('./assets/back-icon-mask.png')} />
            }>
            <Animated.Text
              style={{ fontSize: 20, transform: [{ translateX }] }}>
              Hello here is a bunch of text
            </Animated.Text>
            <View
              style={{
                position: 'absolute',
                left: 7,
                height: 44,
                justifyContent: 'center',
              }}>
              <Image source={require('./assets/back-icon.png')} />
            </View>
          </MaskedViewIOS>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
