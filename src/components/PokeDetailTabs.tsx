import { Card, Chip, List, ListItem, Tab, Tabs, Typography } from '@mui/material'
import React, { Component } from 'react'
import { Pokemon_V2_Pokemon } from '../gql/graphql'

type Props = {
    pokemon: Pokemon_V2_Pokemon
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
                                    <Typography variant='body2'>Flavor Text: {move.pokemon_v2_move?.pokemon_v2_moveflavortexts.length === 0 ? null : move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0].flavor_text}</Typography>
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
                                    <Typography variant='subtitle1'>{encounter.pokemon_v2_locationarea?.pokemon_v2_location?.pokemon_v2_locationnames[0].name}</Typography>
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
                                    <Typography variant='body2'>Summary: {ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].short_effect}</Typography>
                                    <Typography variant='body2'>Description: {ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].effect}</Typography>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
            </>
        )
    }
}