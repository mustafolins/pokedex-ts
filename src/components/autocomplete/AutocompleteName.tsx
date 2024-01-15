import { Autocomplete, AutocompleteInputChangeReason, CircularProgress, FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'
import { Pokemon_V2_Pokemon } from '../../gql/graphql'

type Props = {
    searchTextChanged(value: any): void,
    label: string,
    value?: string,
    pokemon: Pokemon_V2_Pokemon[]
}

type State = {
    isOpen: boolean
}

export default class AutocompleteName extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.autocompleteInputChanged = this.autocompleteInputChanged.bind(this)
        this.getPokemonNames = this.getPokemonNames.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    autocompleteInputChanged(event: React.SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason): void {
        this.props.searchTextChanged(value)
        console.log(value)
    }
    getPokemonNames(): string[] {
        return this.props.pokemon.map<string>((pokemon) => pokemon.name)
    }
    isLoading(): boolean {
        return this.getPokemonNames().length === 0
    }
    render() {
        return (
            <FormControl style={{ margin: '10px', width: '220px' }}>
                <Autocomplete
                    value={this.props.value}
                    autoComplete
                    autoSelect
                    freeSolo
                    options={this.getPokemonNames()}
                    loading={this.isLoading()}
                    onInputChange={this.autocompleteInputChanged}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={this.props.label}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <div>
                                        {this.isLoading() ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </div>
                                ),
                            }}
                        />
                    )}
                />
            </FormControl>
        )
    }
}
