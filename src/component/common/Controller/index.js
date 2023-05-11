import React from 'react';
import { Controller } from 'react-hook-form';
import FormErrorMessage from "component/common/ErrorMessage";

const CustomController = ({ control, name, render, showError = true, error, messages, ...props }) => {

    return (
        <>
            <Controller
                {...props}
                name={name}
                render={render}
                control={control}
            />
            {
                showError &&
                <FormErrorMessage
                    error={error}
                    messages={messages}
                />
            }
        </>
    )
}

export default CustomController;