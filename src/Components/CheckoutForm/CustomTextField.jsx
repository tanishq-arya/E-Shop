import React from 'react'
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <Grid item xs = {12} sm = {6}>
            <Controller
                as = {TextField}
                name = {name}
                control = {control}
                // label = {label}
                // fullWidth
                // required = {required}
                render = {({ field})=> (
                    <TextField
                        fullWidth
                        label={label}
                        required
                    />
                )}
                // error={isError}
            />
        </Grid>
    );
}

export default FormInput