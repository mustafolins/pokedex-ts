import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, CircularProgress, FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'
import { Pokemon_V2_Type } from '../../gql/graphql'

type Props = {
    searchTextChanged(value: string[]): void,
    label: string,
    value?: string[],
    types: Pokemon_V2_Type[]
}

type State = {
    isOpen: boolean
}

export default class AutocompleteType extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.autocompleteInputChanged = this.autocompleteInputChanged.bind(this)
        this.getTypes = this.getTypes.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    autocompleteInputChanged(event: React.SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined): void {
        this.props.searchTextChanged(value)
        console.log(value)
    }
    getTypes(): string[] {
        return this.props.types.map<string>((type) => type.name)
    }
    isLoading(): boolean {
        return this.getTypes().length === 0
    }
    render() {
        return (
            <FormControl style={{ margin: '10px', width: '220px' }}>
                <Autocomplete
                    value={this.props.value}
                    autoComplete
                    autoSelect
                    multiple
                    options={this.getTypes()}
                    loading={this.isLoading()}
                    onChange={this.autocompleteInputChanged}
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
