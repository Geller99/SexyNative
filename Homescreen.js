import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const HomeScreen = ({ openDrawer }) => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	return (
		<View style={styles.container}>
			<Button title='open drawer' onPress={openDrawer} />
		</View>
	);
};

export default HomeScreen;