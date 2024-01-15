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
    query PokemonHeightWeightType($height: Int = 0, $weight: Int = 0, $type: String) {
        pokemon: pokemon_v2_pokemon(
            where: {
                height: { _gte: $height }
                weight: { _gte: $weight }
                _and: [{
                    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
                }]
            }
        ) {
            id
        }
    }
`;

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
                    encoutnermethod: pokemon_v2_encountermethod {
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
            pokemon_v2_pokemonmoves {
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
            pokemon_v2_pokemonsprites {
                sprites
            }
        }
    }
`;