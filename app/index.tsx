import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

//"name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/"
//objet Pokemon
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: pokemonType[];


}
interface pokemonType {
  type: {
    name: string;
    url: string;
  };
}
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#FAE030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};
export default function Index() {
  const [pokemon, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    //fetch a pokemon
    fetchPokemon();
  }, [])
  async function fetchPokemon() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          //console.log(details);

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          }
        })
      );
      //console.log(detailedPokemons);

      setPokemons(detailedPokemons);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 10,
        padding: 10
      }}
    >
      {pokemon.map((pokemon) => (
        <Link key={pokemon.name}
          href={{ pathname: "/details", params: { name: pokemon.name, image: pokemon.image, imageBack: pokemon.imageBack, types: pokemon.types[0].type.name } }}
          style={{
            //@ts-ignore
            backgroundColor: typeColors[pokemon.types[0].type.name],

            padding: 10,
            borderRadius: 10,
            gap: 10,
          }}
        >
          <View>

            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>


            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Image source={{ uri: pokemon.image }} style={{ width: 150, height: 150 }} />
              <Image source={{ uri: pokemon.imageBack }} style={{ width: 150, height: 150 }} />
            </View>

          </View>
        </Link>
      ))}
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  type: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center'
  }
})
