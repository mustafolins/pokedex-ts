import React, { Component } from 'react'
import { Pokemon_V2_Pokemon } from '../gql/graphql'
import { Card } from '@mui/material'

type Props = {
    pokemon: Pokemon_V2_Pokemon
    selectPokemon(pokemon: Pokemon_V2_Pokemon): void
}

type State = {}

export default class PokeCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.getSprite = this.getSprite.bind(this)
        this.handleClicked = this.handleClicked.bind(this)
    }
    getSprite(): string | undefined {
        var spriteData = this.props.pokemon.pokemon_v2_pokemonsprites
        return spriteData?.length > 0 ? spriteData[0].sprites.front_default : undefined
    }
    handleClicked(): void {
        this.props.selectPokemon(this.props.pokemon)
    }
    render() {
        return (
            <Card variant="elevation" elevation={2} sx={{ width: '100%', height: '100%', border: 'solid' }} onClick={this.handleClicked}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={this.getSprite()} alt='' style={{ height: '100%' }} />
                            </td>
                            <td>
                                <>Id: {this.props.pokemon.id}</>
                                <br />
                                <>Name: {this.props.pokemon.name}</>
                                <br />
                                <>Height: {this.props.pokemon.height}</>
                                <br />
                                <>Weight: {this.props.pokemon.weight}</>
                                <br />
                                <>Base XP: {this.props.pokemon.base_experience}</>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}