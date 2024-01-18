import { gql } from '@apollo/client';

export const allPokemonAndSpritesQuery = gql`
    query AllPokemonData {
      pokemon: pokemon_v2_pokemon {
          base_experience
          height
          id
          is_default
          name
          order
          pokemon_species_id
          weight
          pokemon_v2_pokemonsprites {
              id
              sprites
          }
      }
    }
`;

export const pokemonTypesQuery = gql`
    query PokemonTypes {
        types: pokemon_v2_type{
            id
            name
        }
    }
`;

export const pokemonHeightWeightQuery = gql`
    query PokemonHeightWeight($height: Int = 0, $weight: Int = 0) {
        pokemon: pokemon_v2_pokemon(
            where: { height: { _gte: $height }, weight: { _gte: $weight } }
        ) {
            id
        }
    }
`;

export const pokemonHeightWeightTypeQuery = gql`
    query PokemonHeightWeightType($height: Int = 0, $weight: Int = 0, $type: [String!]) {
        pokemon: pokemon_v2_pokemon(
            where: {
                height: { _gte: $height }
                weight: { _gte: $weight }
                _and: [{
                    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $type } } }
                }]
            }
        ) {
            id
        }
    }
`;

export const pokemonHeightWeightTypeStatQuery = gql`
    query PokemonHeightWeightType(
        $height: Int = 0
        $weight: Int = 0
        $type: [String!]
        $hp: Int! = 0
        $attack: Int! = 0
        $defense: Int! = 0
        $specialattack: Int! = 0
        $specialdefense: Int! = 0
    ) {
        pokemon: pokemon_v2_pokemon(
            where: {
                height: { _gte: $height }
                weight: { _gte: $weight }
                _and: [
                    { pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $type } } } }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $hp }
                            pokemon_v2_stat: { name: { _eq: "hp" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $attack }
                            pokemon_v2_stat: { name: { _eq: "attack" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $defense }
                            pokemon_v2_stat: { name: { _eq: "defense" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $specialattack }
                            pokemon_v2_stat: { name: { _eq: "special-attack" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $specialdefense }
                            pokemon_v2_stat: { name: { _eq: "special-defense" } }
                        }
                    }
                ]
            }
        ) {
            id
        }
    }
`

export const pokemonHeightWeightStatQuery = gql`
    query PokemonHeightWeightType(
        $height: Int = 0
        $weight: Int = 0
        $hp: Int! = 0
        $attack: Int! = 0
        $defense: Int! = 0
        $specialattack: Int! = 0
        $specialdefense: Int! = 0
    ) {
        pokemon: pokemon_v2_pokemon(
            where: {
                height: { _gte: $height }
                weight: { _gte: $weight }
                _and: [
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $hp }
                            pokemon_v2_stat: { name: { _eq: "hp" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $attack }
                            pokemon_v2_stat: { name: { _eq: "attack" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $defense }
                            pokemon_v2_stat: { name: { _eq: "defense" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $specialattack }
                            pokemon_v2_stat: { name: { _eq: "special-attack" } }
                        }
                    }
                    {
                        pokemon_v2_pokemonstats: {
                            base_stat: { _gte: $specialdefense }
                            pokemon_v2_stat: { name: { _eq: "special-defense" } }
                        }
                    }
                ]
            }
        ) {
            id
        }
    }
`

export const pokemonDetailQuery = gql`
    query PokemonDetail($id: Int = 1) {
        pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
            base_experience
            height
            id
            is_default
            name
            order
            pokemon_species_id
            weight
            pokemon_v2_encounters {
                encounter_slot_id
                id
                location_area_id
                max_level
                min_level
                pokemon_id
                version_id
                pokemon_v2_encounterslot {
                    encounter_method_id
                    id
                    rarity
                    slot
                    version_group_id
                    pokemon_v2_encountermethod {
                        id
                        name
                        order
                    }
                }
                pokemon_v2_locationarea {
                    game_index
                    id
                    location_id
                    name
                    pokemon_v2_location {
                        id
                        name
                        region_id
                        pokemon_v2_locationnames(where: { language_id: { _eq: 9 } }) {
                            id
                            location_id
                            name
                        }
                    }
                }
            }
            pokemon_v2_pokemonabilities {
                ability_id
                id
                is_hidden
                pokemon_id
                slot
                pokemon_v2_ability {
                    generation_id
                    id
                    is_main_series
                    name
                    pokemon_v2_abilitychanges {
                        ability_id
                        id
                    }
                    pokemon_v2_abilityeffecttexts(
                        where: { language_id: { _eq: 9 } }
                    ) {
                        id
                        ability_id
                        effect
                        short_effect
                    }
                }
            }
            pokemon_v2_pokemontypes {
                id
                pokemon_id
                slot
                type_id
                pokemon_v2_type {
                    id
                    move_damage_class_id
                    name
                }
            }
            pokemon_v2_pokemonstats {
                base_stat
                effort
                id
                pokemon_id
                stat_id
                pokemon_v2_stat {
                    id
                    is_battle_only
                    move_damage_class_id
                    name
                }
            }
            pokemon_v2_pokemonmoves(distinct_on: move_id) {
                id
                level
                move_id
                move_learn_method_id
                order
                pokemon_id
                version_group_id
                pokemon_v2_move {
                    accuracy
                    contest_effect_id
                    contest_type_id
                    generation_id
                    id
                    move_damage_class_id
                    move_effect_chance
                    move_effect_id
                    move_target_id
                    name
                    power
                    pokemon_v2_moveflavortexts(where: { language_id: { _eq: 9 } }) {
                        flavor_text
                    }
                    pokemon_v2_movedamageclass {
                        name
                    }
                }
                pokemon_v2_movelearnmethod {
                    id
                    name
                    pokemon_v2_movelearnmethoddescriptions(
                        where: { language_id: { _eq: 9 } }
                    ) {
                        id
                        description
                    }
                }
            }
            pokemon_v2_pokemonspecy {
                base_happiness
                capture_rate
                evolution_chain_id
                evolves_from_species_id
                forms_switchable
                gender_rate
                generation_id
                growth_rate_id
                has_gender_differences
                is_baby
                is_legendary
                is_mythical
                
                pokemon_v2_evolutionchain{
                    id
    
                    pokemon_v2_pokemonspecies{
                        id
                        name
                    }
                }
            }
            pokemon_v2_pokemonsprites {
                sprites
            }
        }
    }
`;