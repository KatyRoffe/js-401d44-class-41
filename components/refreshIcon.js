import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '../assets/colors'

export default function RefreshIcon({ load }) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
        <View style={styles.reloadIcon}>
            <FontAwesome onPress={load} name={reloadIconName} size={24} color={colors.SECONDARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 60,
        right: 20,
    },
})