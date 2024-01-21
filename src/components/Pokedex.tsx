import React, { Component } from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Pokemon_V2_Pokemon, Pokemon_V2_Type } from '../gql/graphql';
import AutocompleteName from './autocomplete/AutocompleteName';
import IntegerSelector from './selectors/IntegerSelector';
import { allPokemonAndSpritesQuery, pokemonDetailQuery, pokemonTypesQuery } from './GqlQueries';
import PokeCard from './PokeCard';
import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItem, Pagination, Paper } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import PokeDetail from './PokeDetail';
import AutocompleteType from './autocomplete/AutocompleteType';

type Props = {
  client: ApolloClient<NormalizedCacheObject>
}

type State = {
  pokemon: Pokemon_V2_Pokemon[],
  filteredPokemon: Pokemon_V2_Pokemon[]
  types: Pokemon_V2_Type[]
  selected: number,
  selectedName?: string,
  selectedHeight?: number
  selectedWeight?: number
  selectedHp?: number
  selectedAttack?: number
  selectedDefense?: number
  selectedSpecialAttack?: number
  selectedSpecialDefense?: number
  selectedPokemon?: Pokemon_V2_Pokemon
  selectedType?: string[]
  currentPage: number
}

export default class Pokedex extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      pokemon: [],
      filteredPokemon: [],
      types: [],
      selected: 1,
      selectedName: 'bulbasaur', // this is the first pokemon
      selectedType: [],
      currentPage: 1
    }

    this.nameChanged = this.nameChanged.bind(this)
    this.typeChanged = this.typeChanged.bind(this)
    this.heightChanged = this.heightChanged.bind(this)
    this.weightChanged = this.weightChanged.bind(this)
    this.hpChanged = this.hpChanged.bind(this)
    this.attackChanged = this.attackChanged.bind(this)
    this.defenseChanged = this.defenseChanged.bind(this)
    this.specialAttackChanged = this.specialAttackChanged.bind(this)
    this.specialDefenseChanged = this.specialDefenseChanged.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)
    this.getAllPokemon = this.getAllPokemon.bind(this)
    this.filter = this.filter.bind(this)
    this.getPokemonDetails = this.getPokemonDetails.bind(this)
    this.getPokemonTypes = this.getPokemonTypes.bind(this)
    this.selectPokemon = this.selectPokemon.bind(this)
  }

  componentDidMount(): void {
    this.getAllPokemon()
    this.getPokemonDetails()
    this.getPokemonTypes()
  }

  getPokemonTypes() {
    this.props.client
      .query({
        query: pokemonTypesQuery,
      })
      .then((result) => {
        console.log(result.data)
        console.log(result.data.types)

        this.setState({
          types: result.data.types
        })
      });
  }

  selectPokemon(pokemon: Pokemon_V2_Pokemon): void {
    this.setState({
      selected: pokemon.id,
      selectedName: pokemon.name
    }, () => {
      this.getPokemonDetails()
    })
  }

  getPokemonDetails() {
    this.props.client
      .query({
        query: pokemonDetailQuery,
        variables: {
          id: this.state.selected
        }
      })
      .then((result) => {
        console.log(result.data)
        console.log(result.data.pokemon)

        this.setState({
          selectedPokemon: result.data.pokemon[0]
        })
      });
  }

  nameChanged(value: string): void {
    this.setState({
      selectedName: value
    })

    var pokemon = this.state.pokemon.find((pokemon) => pokemon.name === value)

    if (pokemon !== undefined) {
      this.setState({
        selected: pokemon.id,
      }, () => {
        this.getPokemonDetails()
      })
    }
  }

  typeChanged(value: string[]): void {
    this.setState({
      selectedType: value,
      currentPage: 1
    }, () => this.filter())
  }

  heightChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedHeight: value,
      currentPage: 1
    }, () => this.filter())
  }

  weightChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedWeight: value,
      currentPage: 1
    }, () => this.filter())
  }

  hpChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedHp: value,
      currentPage: 1
    }, () => this.filter())
  }

  attackChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedAttack: value,
      currentPage: 1
    }, () => this.filter())
  }

  defenseChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedDefense: value,
      currentPage: 1
    }, () => this.filter())
  }

  specialAttackChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedSpecialAttack: value,
      currentPage: 1
    }, () => this.filter())
  }

  specialDefenseChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedSpecialDefense: value,
      currentPage: 1
    }, () => this.filter())
  }

  loadNextPage(event: any, value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      currentPage: value
    })
  }

  filter(): void {
    this.setState({
      filteredPokemon: this.state.pokemon.filter((pokemon) => {
        var shouldShow = false

        if (this.state.selectedType !== undefined && this.state.selectedType.length > 0) {
          var hasType = false
          for (const type of this.state.selectedType) {
            if (pokemon.pokemon_v2_pokemontypes.some((pokeType) => pokeType.pokemon_v2_type?.name === type))
              hasType ||= true
          }
          shouldShow ||= hasType
        }
        else {
          shouldShow = true
        }
        if (this.state.selectedHp !== undefined) {
          shouldShow &&= pokemon.pokemon_v2_pokemonstats.find((stat) => stat.pokemon_v2_stat?.name === 'hp' && stat.base_stat >= this.state.selectedHp!) !== undefined
        }
        if (this.state.selectedAttack !== undefined) {
          shouldShow &&= pokemon.pokemon_v2_pokemonstats.find((stat) => stat.pokemon_v2_stat?.name === 'attack' && stat.base_stat >= this.state.selectedAttack!) !== undefined
        }
        if (this.state.selectedDefense !== undefined) {
          shouldShow &&= pokemon.pokemon_v2_pokemonstats.find((stat) => stat.pokemon_v2_stat?.name === 'defense' && stat.base_stat >= this.state.selectedDefense!) !== undefined
        }
        if (this.state.selectedSpecialAttack !== undefined) {
          shouldShow &&= pokemon.pokemon_v2_pokemonstats.find((stat) => stat.pokemon_v2_stat?.name === 'special-attack' && stat.base_stat >= this.state.selectedSpecialAttack!) !== undefined
        }
        if (this.state.selectedSpecialDefense !== undefined) {
          shouldShow &&= pokemon.pokemon_v2_pokemonstats.find((stat) => stat.pokemon_v2_stat?.name === 'special-defense' && stat.base_stat >= this.state.selectedSpecialDefense!) !== undefined
        }
        if (this.state.selectedWeight !== undefined && pokemon.weight !== undefined) {
          shouldShow &&= pokemon.weight! >= this.state.selectedWeight
        }
        if (this.state.selectedHeight !== undefined && pokemon.height !== undefined) {
          shouldShow &&= pokemon.height! >= this.state.selectedHeight
        }

        return shouldShow;
      })
    })
  }

  getAllPokemon(): void {
    this.props.client
      .query({
        query: allPokemonAndSpritesQuery
      })
      .then((result) => {
        console.log(result.data)
        console.log(result.data.pokemon)

        this.setState({
          pokemon: result.data.pokemon,
          filteredPokemon: result.data.pokemon
        })
      });
  }

  render() {
    return (
      <Paper elevation={0}>
        <table style={{ width: '100%', height: '75%' }}>
          <tbody>
            <tr>
              <td>
                {this.state.selectedPokemon === undefined ? null : <PokeDetail pokemon={this.state.selectedPokemon} pokemons={this.state.pokemon} selectPokemon={this.selectPokemon} />}
              </td>
              <td width='30%'>
                <Accordion sx={{ margin: '15px' }} disableGutters={true} elevation={1}>
                  <AccordionSummary expandIcon={<FilterListIcon />}>
                    Filter
                  </AccordionSummary>
                  <AccordionDetails>
                    <AutocompleteName label='Name' value={this.state.selectedName} searchTextChanged={this.nameChanged} pokemon={this.state.filteredPokemon} />
                    <AutocompleteType label='Type' value={this.state.selectedType} searchTextChanged={this.typeChanged} types={this.state.types} />
                    <Divider>Stats</Divider>
                    <IntegerSelector label='Hp' handleChanged={this.hpChanged} />
                    <IntegerSelector label='Attack' handleChanged={this.attackChanged} />
                    <IntegerSelector label='Defense' handleChanged={this.defenseChanged} />
                    <IntegerSelector label='Special Attack' handleChanged={this.specialAttackChanged} />
                    <IntegerSelector label='Special Defense' handleChanged={this.specialDefenseChanged} />
                    <Divider>Physical Traights</Divider>
                    <IntegerSelector label='Height' handleChanged={this.heightChanged} />
                    <IntegerSelector label='Weight' handleChanged={this.weightChanged} />
                  </AccordionDetails>
                </Accordion>
                <List sx={{ overflow: 'auto', maxHeight: '80vh' }}>
                  {
                    this.state.filteredPokemon.length < 1 ? null : this.state.filteredPokemon.slice(this.state.currentPage * 10 - 10, this.state.currentPage * 10).map((pokemon, index) =>
                      <ListItem key={`poke-listitem-${pokemon.id}-${index}`}>
                        <PokeCard pokemon={pokemon} selectPokemon={this.selectPokemon} />
                      </ListItem>
                    )
                  }
                </List>
                {this.state.filteredPokemon.length > 0 ?
                  <Pagination color='primary' count={Math.ceil(this.state.filteredPokemon.length / 10)} onChange={this.loadNextPage} page={this.state.currentPage} /> : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    )
  }
}