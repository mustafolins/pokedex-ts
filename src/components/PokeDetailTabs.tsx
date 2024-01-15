import { Card, List, ListItem, Tab, Tabs } from '@mui/material'
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
                                {type.pokemon_v2_type?.name}
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 2 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemonstats.map((stat, index) =>
                            <ListItem key={`pokemon-stat-${index}`}>
                                <Card variant="outlined" sx={{ width: '100%' }}>
                                    <>Stat: {stat.pokemon_v2_stat?.name}</>
                                    <br />
                                    <>Base Stat: {stat.base_stat}</>
                                    <br />
                                    <>Effort: {stat.effort}</>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 3 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemonmoves.map((move, index) =>
                            <ListItem key={`pokemon-move-${index}`}>
                                <Card variant="outlined" sx={{ width: '100%' }}>
                                    <>Move: {move.pokemon_v2_move?.name}</>
                                    <br />
                                    <>Power: {move.pokemon_v2_move?.power}</>
                                    <br />
                                    <>Accuracy: {move.pokemon_v2_move?.accuracy}</>
                                    <br />
                                    <>Damage Class: {move.pokemon_v2_move?.pokemon_v2_movedamageclass?.name}</>
                                    <br />
                                    <>Flavor Text: {move.pokemon_v2_move?.pokemon_v2_moveflavortexts.length === 0 ? null : move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0].flavor_text}</>
                                    <br />
                                    <>Learn Method: {move.pokemon_v2_movelearnmethod?.name}</>
                                    <br />
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 4 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_encounters.map((encounter, index) =>
                            <ListItem key={`pokemon-encounter-${index}`}>
                                <Card variant="outlined" sx={{ width: '100%' }}>
                                    <>Location: {encounter.pokemon_v2_locationarea?.pokemon_v2_location?.pokemon_v2_locationnames[0].name}</>
                                    <br />
                                    <>Encounter Method: {encounter.pokemon_v2_encounterslot?.pokemon_v2_encountermethod?.name}</>
                                    <br />
                                    <>Minimum Level: {encounter.min_level}</>
                                    <br />
                                    <>Maximum Level: {encounter.max_level}</>
                                    <br />
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
                {this.state.selectedTabIndex !== 5 ? null :
                    <List sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        {this.props.pokemon.pokemon_v2_pokemonabilities.map((ability, index) =>
                            <ListItem key={`pokemon-ability-${index}`}>
                                <Card variant="outlined" sx={{ width: '100%' }}>
                                    <>Ability: {ability.pokemon_v2_ability?.name}</>
                                    <br />
                                    <>Summary: {ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].short_effect}</>
                                    <br />
                                    <>Description: {ability.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].effect}</>
                                    <br />
                                </Card>
                            </ListItem>
                        )}
                    </List>
                }
            </>
        )
    }
}