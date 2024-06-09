import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useIsFocused from '@react-navigation/core/src/useIsFocused';

function HomeScreen({ navigation, onUpdate, foo }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen foo: {foo}</Text>
      <Button
        title="Go to DetailA"
        onPress={() => {
            onUpdate();
            navigation.navigate('DetailA')
        }}
      />
    </View>
  );
}

function DetailAScreen({ navigation, onUpdate, foo }) {
  const isFocused = useIsFocused();
  const textRef = React.useRef(null);
  const textCallbackRef = (ref) => {
      console.log('==== here ref', !!ref);
      textRef.current = ref;
      if (isFocused) {
        navigation.navigate('DetailB')
      } else {
        navigation.navigate('DetailA')
      }
  };


  console.log('==== render DetailAScreen, isFocused', isFocused);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DetailA Screen, foo: {foo}</Text>
      <Text ref={textCallbackRef}>DetailA isFocused: {String(isFocused)}</Text>
      <Button
        title="Go DetailB"
        onPress={() => {
            onUpdate();
            navigation.navigate('DetailB')
        }}
      />
    </View>
  );
}

function DetailBScreen({ navigation, onUpdate, foo }) {
  console.log('==== render DetailBScreen');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DetailB Screen foo: {foo}</Text>
      <Button
        title="Go back home"
        onPress={() => {
            onUpdate();
            navigation.navigate('Home')
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [foo, setFoo] = React.useState(0);
  const updateFoo = () => {
    setFoo(pre => pre + 1);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} foo={foo} onUpdate={updateFoo} />}
        </Stack.Screen>
        <Stack.Screen name="DetailA">
          {(props) => <DetailAScreen {...props} foo={foo} onUpdate={updateFoo} />}
        </Stack.Screen>
        <Stack.Screen name="DetailB">
          {(props) => <DetailBScreen {...props} foo={foo} onUpdate={updateFoo} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
