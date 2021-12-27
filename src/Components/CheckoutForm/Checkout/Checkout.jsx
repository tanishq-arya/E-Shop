import React, {useState, useEffect} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import useStyles from './styles';
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../library/commerce'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ refreshCart, cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const history = useHistory();
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() =>{
        if (cart.id) {
            const generateToken = async () => {
                try{
                    const token = await commerce.checkout.generateToken(cart.id, { type : 'cart' });
                    console.log(token);
                    setCheckoutToken(token);
                }catch (error){
                    history.pushState('/');
                    // console.log(error);
                }
            };

            generateToken();
        }
    },[cart]);

    console.log(checkoutToken)

    const next = (data) => {
        setShippingData(data);
    
        nextStep();
    };

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
            // console.log('Hello, World!')
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                console.log(order.customer.firstname);
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference} </Typography>
            </div>
            <br/>
            <div style = {{ display: 'flex', justifyContent: 'space-between'}}>
                <Button component={Link} to="/" variant="outlined" onClick={refreshCart} type="button">Back to Home</Button>
                <Button component={Link} to="/past-orders" variant="outlined" onClick={refreshCart} type="button">Past Orders</Button>
            </div>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider} />
            </div>
            <br/>
            <div style = {{ display: 'flex', justifyContent: 'space-between'}}>
                <Button component={Link} to="/" variant="outlined" onClick={refreshCart} type="button">Back to Home</Button>
                <Button component={Link} to="/past-orders" variant="outlined" onClick={refreshCart} type="button">Past Orders</Button>
            </div>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );

    if(error){
        <>
            <div style = {{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h5">Error: {error}</Typography>
                <Button component={Link} to="/" variant="outlined" onClick={refreshCart} type="button">Back to Home</Button>
                <Button component={Link} to="/past-orders" variant="outlined" onClick={refreshCart} type="button">Past Orders</Button>
            </div>
        </>
    }
    
    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next = { next } nextStep={nextStep} setShippingData={setShippingData}/>// test={test} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>);
        // Render JSX => useEffect 
    return (
        <>
        <CssBaseline/>
            <div className = {classes.toolbar} />
            <main className = {classes.layout}>
                <Paper className = {classes.paper}>
                    <Typography variant = "h4" align = "center">Checkout</Typography>
                    <Stepper activeStep = {activeStep} className = {classes.stepper}>
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
    );
};

export default Checkout;