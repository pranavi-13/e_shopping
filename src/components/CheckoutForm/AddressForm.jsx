/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {commerce} from '../../lib/commerce';
import FormInput from "./CustomTextField";
import {Link} from "react-router-dom";
const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    //Object - Array of arrays so need to use Object.entries
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name})); /*array of arrays with country code and name ass subarray*/
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => ({id:code, label:name}));
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));
    //single array. display Domestic/International along with shipping charges
    console.log(countries);
    
    const fetchShippingCountries = async(checkoutTokenId) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]); //get keys of countries that we set up in commerce.js [IN, GE, KR...] and display first one
    }

    const fetchSubdivisions = async(countryCode) =>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async(checkoutTokenId, country, region=null) =>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region});

        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    //call as soon as address form is rendered
    useEffect(()=>{
            fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]); //perform the action of fethching subdivision everytime shippingCountry changes

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]); //change upon change in subdivision
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
            {/*handleSubmit has a data object that contains all the details filled in the form and send it back to Checkout */}
                <form onSubmit={methods.handleSubmit((data) =>next({...data, shippingCountry, shippingSubdivision, shippingOption}) )}> 
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First Name"/>
                        <FormInput required name="lastName" label="Last Name"/>
                        <FormInput required name="address" label="Address"/>
                        <FormInput required name="city" label="City"/>
                        <FormInput required name="pincode" label="Pincode"/>
                        <FormInput required name="email" label="Email"/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisons</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision)=>(
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)}>
                                {options.map((option)=>(
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component ={Link} to="/cart" variant="outlined"> Back to Cart</Button>
                        <Button type="submit" color ="primary" variant="contained">Next</Button>
                    </div>
                </form>
            </FormProvider>   
        </>
    );
}

export default AddressForm;
