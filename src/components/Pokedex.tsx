import React, { Component } from 'react'
import { ApolloClient, DocumentNode, NormalizedCacheObject } from '@apollo/client';
import { Pokemon_V2_Pokemon, Pokemon_V2_Type } from '../gql/graphql';
import AutocompleteName from './autocomplete/AutocompleteName';
import IntegerSelector from './selectors/IntegerSelector';
import { allPokemonAndSpritesQuery, pokemonDetailQuery, pokemonHeightWeightQuery, pokemonHeightWeightStatQuery, pokemonHeightWeightTypeQuery, pokemonHeightWeightTypeStatQuery, pokemonTypesQuery } from './GqlQueries';
import PokeCard from './PokeCard';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, Pagination, Paper } from '@mui/material';
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
    this.loadNextPage = this.loadNextPage.bind(this)
    this.runQuery = this.runQuery.bind(this)
    this.getPokemonDetails = this.getPokemonDetails.bind(this)
    this.getPokemonTypes = this.getPokemonTypes.bind(this)
    this.selectPokemon = this.selectPokemon.bind(this)
  }

  componentDidMount(): void {
    this.runQuery(true)
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
    }, () => this.runQuery())
  }

  heightChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedHeight: value,
      currentPage: 1
    }, () => this.runQuery())
  }

  weightChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedWeight: value,
      currentPage: 1
    }, () => this.runQuery())
  }

  hpChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedHp: value,
      currentPage: 1
    }, () => this.runQuery())
  }

  attackChanged(value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      selectedAttack: value,
      currentPage: 1
    }, () => this.runQuery())
  }

  loadNextPage(event: any, value: number): void {
    if (Number.isNaN(value)) {
      return
    }

    this.setState({
      currentPage: value
    })
  }

  runQuery(allQuery: boolean = false): void {
    var queryToRun: DocumentNode = allPokemonAndSpritesQuery
    var variables: any = {}
    if (!allQuery) {
      queryToRun = pokemonHeightWeightQuery
      variables.weight = this.state.selectedWeight
      variables.height = this.state.selectedHeight

      if (this.state.types.find((type) => this.state.selectedType?.find((selectedType) => selectedType === type.name)) !== undefined) {
        variables.type = this.state.selectedType
        queryToRun = pokemonHeightWeightTypeQuery

        if (this.state.selectedHp !== undefined || this.state.selectedAttack !== undefined) {
          variables.hp = this.state.selectedHp
          variables.attack = this.state.selectedAttack
          queryToRun = pokemonHeightWeightTypeStatQuery
        }
      }
      else if (this.state.selectedHp !== undefined || this.state.selectedAttack !== undefined) {
        variables.hp = this.state.selectedHp
        variables.attack = this.state.selectedAttack
        queryToRun = pokemonHeightWeightStatQuery
      }

    }
    else {
      variables = {}
    }

    if (allQuery) {
      this.props.client
        .query({
          query: queryToRun
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
    else {
      this.props.client
        .query({
          query: queryToRun,
          variables: variables
        })
        .then((result) => {
          console.log(result.data)
          console.log(result.data.pokemon)

          this.setState({
            filteredPokemon: this.state.pokemon.filter((pokemon) => (result.data.pokemon as Pokemon_V2_Pokemon[]).some((ap) => ap.id === pokemon.id))
          })
        });
    }
  }

  render() {
    return (
      <Paper elevation={0}>
        <table style={{ width: '100%', height: '75%' }}>
          <tbody>
            <tr>
              <td>
                {this.state.selectedPokemon === undefined ? null : <PokeDetail pokemon={this.state.selectedPokemon} />}
              </td>
              <td width='30%'>
                <Accordion sx={{ margin: '15px' }} disableGutters={true} elevation={1}>
                  <AccordionSummary expandIcon={<FilterListIcon />}>
                    Filter
                  </AccordionSummary>
                  <AccordionDetails>
                    <AutocompleteName label='Name' value={this.state.selectedName} searchTextChanged={this.nameChanged} pokemon={this.state.filteredPokemon} />
                    <AutocompleteType label='Type' value={this.state.selectedType} searchTextChanged={this.typeChanged} types={this.state.types} />
                    <IntegerSelector label='Height' handleChanged={this.heightChanged} />
                    <IntegerSelector label='Weight' handleChanged={this.weightChanged} />
                    <IntegerSelector label='Hp' handleChanged={this.hpChanged} />
                    <IntegerSelector label='Attack' handleChanged={this.attackChanged} />
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