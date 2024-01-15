import { Card } from '@mui/material'
import React, { Component } from 'react'
import { Pokemon_V2_Pokemon } from '../gql/graphql'
import PokeDetailTabs from './PokeDetailTabs'

type Props = {
    pokemon: Pokemon_V2_Pokemon
}

type State = {
}

export default class PokeDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.getSprite = this.getSprite.bind(this)
    }
    getSprite(): string | undefined {
        var spriteData = this.props.pokemon.pokemon_v2_pokemonsprites
        return spriteData?.length > 0 ? spriteData[0].sprites.front_default : undefined
    }
    render() {
        return (
            <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                <img src={this.getSprite()} alt='' style={{ scale: '1'}} />
                <>Id: {this.props.pokemon.id}</>
                <br />
                <>Name: {this.props.pokemon.name}</>
                <br />
                <>Height: {this.props.pokemon.height}</>
                <br />
                <>Weight: {this.props.pokemon.weight}</>
                <br />
                <>Base XP: {this.props.pokemon.base_experience}</>
                <PokeDetailTabs pokemon={this.props.pokemon} />
            </Card>
        )
    }
}