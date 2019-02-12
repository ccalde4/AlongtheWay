import React, {Component} from 'react';
import { AppRegistry, TextInput } from 'react-native';
export default class writeReview extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Write Review' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'black', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AlongtheWay', () => UselessTextInput);
