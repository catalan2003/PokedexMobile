import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";



export default function Details() {
    const params = useLocalSearchParams();
    console.log(params.name);
    useEffect(() => { }, []);
    async function fetchPokemonByName(name: string) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Stack.Screen options={{ title: (params.name as string).charAt(0).toUpperCase() + (params.name as string).slice(1) }} />

            <ScrollView
                contentContainerStyle={{
                    gap: 10,
                    padding: 10
                }}
            >
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
})
