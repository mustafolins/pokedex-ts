import { Card, CardContent, CardHeader, Divider, Paper, Typography } from '@mui/material'
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
            <Card variant="elevation" elevation={1} sx={{ width: '100%', height: '100%', border: 'thick double', }} className='pokedex'>
                <CardHeader title={
                    <Paper>
                        <Typography variant='body2'>{this.props.pokemon.name}</Typography>
                        <Typography variant='body2'>Id: {this.props.pokemon.id}</Typography>
                        <Typography variant='body2'>Height: {this.props.pokemon.height}</Typography>
                        <Typography variant='body2'>Weight: {this.props.pokemon.weight}</Typography>
                        <Typography variant='body2'>Base XP: {this.props.pokemon.base_experience}</Typography>
                    </Paper>}
                    avatar={
                        <img src={this.getSprite()} alt='' />}
                />
                <CardContent>
                    <Paper elevation={2}>
                        <Divider />
                        <PokeDetailTabs pokemon={this.props.pokemon} />
                    </Paper>
                </CardContent>
            </Card>
        )
    }
}