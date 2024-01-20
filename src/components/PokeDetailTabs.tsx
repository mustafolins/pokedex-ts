import { Card, Chip, List, ListItem, Step, StepContent, StepLabel, Stepper, Tab, Tabs, Typography } from '@mui/material'
import React, { Component } from 'react'
import { Pokemon_V2_Pokemon } from '../gql/graphql'
import PokeCard from './PokeCard'

type Props = {
    pokemon: Pokemon_V2_Pokemon,
    pokemons: Pokemon_V2_Pokemon[],
    selectPokemon(pokemon: Pokemon_V2_Pokemon): void
}

type State = {
    selectedTabIndex: number
}

export default class PokeDetailTabs extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            selectedTabIndex: 1
        }

        this.handleTabChange = this.handleTabChange.bind(this)
    }
    handleTabChange(event: any, newValue: any): void {
        this.setState({
            selectedTabIndex: newValue
        })
    }
    render() {
        return (
            <>
                <Tabs variant='scrollable' scrollButtons='auto' allowScrollButtonsMobile onChange={this.handleTabChange} value={this.state.selectedTabIndex}>
                    <Tab label='Types' value={1} />
                    <Tab label='Stats' value={2} />
                    <Tab label='Moves' value={3} />
                    <Tab label='Encounters' value={4} />
                    <Tab label='Abilities' value={5} />
                    <Tab label='Evolutions' value={6} />
                </Tabs>
                {this.state.selectedTabIndex !== 1 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemontypes.map((type, index) =>
                            <ListItem key={`pokemon-type-${index}`}>
                                <Chip label={type.pokemon_v2_type?.name} />
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 2 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemonstats.map((stat, index) =>
                            <ListItem key={`pokemon-stat-${index}`}>
                                <Card variant="elevation" elevation={3} sx={{ width: '100%' }}>
                                    <Typography variant='subtitle1'>{stat.pokemon_v2_stat?.name}</Typography>
                                    <Typography variant='body2'>Base Stat: {stat.base_stat}</Typography>
                                    <Typography variant='body2'>Effort: {stat.effort}</Typography>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 3 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemonmoves.map((move, index) =>
                            <ListItem key={`pokemon-move-${index}`}>
                                <Card variant="elevation" elevation={3} sx={{ width: '100%' }}>
                                    <Typography variant='subtitle1'>{move.pokemon_v2_move?.name}</Typography>
                                    <Typography variant='body2'>Power: {move.pokemon_v2_move?.power}</Typography>
                                    <Typography variant='body2'>Accuracy: {move.pokemon_v2_move?.accuracy}</Typography>
                                    <Typography variant='body2'>Damage Class: {move.pokemon_v2_move?.pokemon_v2_movedamageclass?.name}</Typography>
                                    <Typography variant='body2'>Flavor Text: {move.pokemon_v2_move?.pokemon_v2_moveflavortexts.length === 0
                                        ? null : move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0].flavor_text}</Typography>
                                    <Typography variant='body2'>Level: {move.level}</Typography>
                                    <Typography variant='body2'>Learn Method: {move.pokemon_v2_movelearnmethod?.name}</Typography>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 4 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_encounters.map((encounter, index) =>
                            <ListItem key={`pokemon-encounter-${index}`}>
                                <Card variant="elevation" elevation={3} sx={{ width: '100%' }}>
                                    <Typography variant='subtitle1'>{encounter.pokemon_v2_locationarea?.pokemon_v2_location?.pokemon_v2_locationnames?.length === 0
                                        ? null : encounter.pokemon_v2_locationarea?.pokemon_v2_location?.pokemon_v2_locationnames[0].name}</Typography>
                                    <Typography variant='body2'>Encounter Method: {encounter.pokemon_v2_encounterslot?.pokemon_v2_encountermethod?.name}</Typography>
                                    <Typography variant='body2'>Minimum Level: {encounter.min_level}</Typography>
                                    <Typography variant='body2'>Maximum Level: {encounter.max_level}</Typography>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 5 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemonabilities.map((ability, index) =>
                            <ListItem key={`pokemon-ability-${index}`}>
                                <Card variant="elevation" elevation={3} sx={{ width: '100%' }}>
                                    <Typography variant='subtitle1'>{ability.pokemon_v2_ability?.name}</Typography>
                                    <Typography variant='body2'>Summary: {ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts?.length === 0
                                        ? null : ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].short_effect}</Typography>
                                    <Typography variant='body2'>Description: {ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts?.length === 0
                                        ? null : ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].effect}</Typography>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 6 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        <ListItem key={`pokemon-specy-info`}>
                            <Card variant="elevation" elevation={3} sx={{ width: '100%' }}>
                                <Typography variant='subtitle1'>Evolution Information</Typography>
                                <Typography variant='body2'>Base Happiness: {this.props.pokemon?.pokemon_v2_pokemonspecy?.base_happiness}</Typography>
                                <Typography variant='body2'>Capture Rate: {this.props.pokemon?.pokemon_v2_pokemonspecy?.capture_rate}</Typography>
                                <Typography variant='body2'>Gender Rate: {this.props.pokemon?.pokemon_v2_pokemonspecy?.gender_rate}</Typography>
                                <Typography variant='body2'>Gender Differences: {this.props.pokemon?.pokemon_v2_pokemonspecy?.has_gender_differences}</Typography>
                                <Typography variant='body2'>Is Baby: {this.props.pokemon?.pokemon_v2_pokemonspecy?.is_baby}</Typography>
                                <Typography variant='body2'>Is Legendary: {this.props.pokemon?.pokemon_v2_pokemonspecy?.is_legendary}</Typography>
                                <Typography variant='body2'>Is Mythical: {this.props.pokemon?.pokemon_v2_pokemonspecy?.is_mythical}</Typography>
                                <Stepper sx={{ overflow: 'auto', maxWidth: '70vw' }}>
                                    {this.props.pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies.map((evolution, index) =>
                                        <Step key={`pokemon-specy-${index}`} active={evolution.id === this.props.pokemon.id} expanded={true}>
                                            <StepLabel>{evolution.name}</StepLabel>
                                            <StepContent>
                                                <PokeCard
                                                    pokemon={this.props.pokemons.find((pokemon: Pokemon_V2_Pokemon) => pokemon.id === evolution.id)!}
                                                    selectPokemon={this.props.selectPokemon}
                                                    noBoarder={true} />
                                            </StepContent>
                                        </Step>
                                    )}
                                </Stepper>
                            </Card>
                        </ListItem>
                    </List>
                }
            </>
        )
    }
}