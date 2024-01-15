import { FormControl, TextField } from '@mui/material'
import React, { Component } from 'react'

type Props = {
    label: string
    num?: number,
    handleChanged(num: number): void
}

type State = {}

export default class IntegerSelector extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            num: props.num
        }

        this.numChanged = this.numChanged.bind(this)
    }
    numChanged(event: any) {
        this.props.handleChanged(Number.parseInt(event.target.value))
    }
    render() {
        return (
            <FormControl style={{ margin: '5px' }}>
                <TextField
                    id={`integerselector-${this.props.label}-input`}
                    label={this.props.label}
                    type="number"
                    onChange={this.numChanged}
                    value={this.props.num}
                    inputProps={{
                        step: '5'
                    }}
                />
            </FormControl>
        )
    }
}