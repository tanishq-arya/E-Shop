import React, {useState, useEffect} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import useStyles from './styles';
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../library/commerce'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

    useEffect(() =>{
        if (cart.id) {
            const generateToken = async () => {
                try{
                    const token = await commerce.checkout.generateToken(cart.id, { type : 'cart' });
                    console.log(token);
                    setCheckoutToken(token);
                }catch (error){

                }
            };

            generateToken();
        }
    },[cart]);

    const Confirmation = () => {
        <div>
            Confirmation
        </div>
    }

    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken}/>// nextStep={nextStep} setShippingData={setShippingData} test={test} />
        : <PaymentForm/>);// checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);
       
        // Render JSX => useEffect 
    return (
        <>
            <div className = {classes.toolbar} />
            <main className = {classes.layout}>
                <Paper className = {classes.paper}>
                    <Typography variant = "h4" align = "center">Checkout</Typography>
                    <Stepper activeStep = {0} className = {classes.stepper}>
                        {steps.map((step) => (
                            <Step key = {step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>

            </main>
        </>
    )
}

export default Checkout