import React from "react";
import { Container, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createShortUrl, getShortUrls } from "../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TableComponent} from './table'

export class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {
            enableCustomization: false,
            customizedUrl: '',
            enablePassword: false,
            password:'',
            enableLogging: false,
            longURL: '',
            expiryDate: new Date(),
            result: '',
            shortURLData:{},
        };
        this.handleCustomization = this.handleCustomization.bind(this);
        this.handlePasswordCheckBox = this.handlePasswordCheckBox.bind(this);
        this.handleLongURL = this.handleLongURL.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleCustomizedURL = this.handleCustomizedURL.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCustomization(e) {
        this.setState({enableCustomization: e.target.checked, customizedUrl:''})
    }

    handlePasswordCheckBox(e) {
        this.setState({enablePassword: e.target.checked, password:''})
    }

    handleLongURL(e) {
        this.setState({longURL: e.target.value})
    }

    handleDate(e) {
        console.log('event', new Date(e).toISOString())
        this.setState({expiryDate: e})
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    handleCustomizedURL(e) {
        this.setState({customizedUrl: e.target.value});
    }
    handleErrorNotification(error){
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    };
    handleSuccessNotification(){
        toast.success('url generated succesfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    clearInputs() {
        this.state({
            enableCustomization: false,
            customizedUrl: '',
            enablePassword: false,
            password:'',
            enableLogging: false,
            longURL: '',
            expiryDate: new Date(),
        })
    }

    async componentDidMount() {
        // shortURLData
        const data = await getShortUrls();
        this.setState({shortURLData: data});
    }

    async handleSubmit() {
        let result;
        const formData = {
            enableCustomization: this.state.enableCustomization,
            customizedUrl: this.state.customizedUrl,
            enablePassword: this.state.enablePassword,
            password: this.state.password,
            enableLogging: this.state.enableLogging,
            longURL: this.state.longURL,
            expiryDate: this.state.expiryDate,
        }
        try {
            result = await createShortUrl(formData);
            this.setState({
                result: result.shortURL
            })
            this.handleSuccessNotification();
        } catch (error) {
           this.handleErrorNotification(error.message);
        }
        console.log('Result', result);
    }

    render (){
        return(
            <>
                <Container>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Long Url</Form.Label>
                        <Form.Control 
                            type="longUrl" 
                            placeholder="Enter Long URL" 
                            onChange={this.handleLongURL}
                            value={this.state.longURL}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Expiry Date</Form.Label>
                        <div>
                            <DatePicker selected={this.state.expiryDate} onChange={this.handleDate} />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Check 
                            type="switch"
                            id="enable-logging"
                            label="Enable Logging"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Check 
                            type="switch"
                            id="enable-customization"
                            label="Enable Customization"
                            onChange={this.handleCustomization}
                            checked={this.state.enableCustomization}
                        />
                    </Form.Group>

                    {this.state.enableCustomization && <Form.Group controlId="formBasicEmail">
                        <Form.Label>Customized Url</Form.Label>
                        <Form.Control 
                            type="customizedUrl" 
                            placeholder="Enter Customized URL" 
                            onChange={this.handleCustomizedURL}
                            value={this.state.customizedUrl}
                        />
                    </Form.Group>}

                    <Form.Group controlId="formBasicEmail">
                        <Form.Check 
                            type="switch"
                            id="enable-password"
                            label="Enable Password"
                            onChange={this.handlePasswordCheckBox}
                            checked={this.state.enablePassword}
                        />
                    </Form.Group>

                    {this.state.enablePassword && <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.handlePassword}
                        />
                    </Form.Group>}
                </Form>
                                    
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                </Button>
                <hr></hr>
                <div>
                    Generated URL: {this.state.result}
                </div>
                <hr></hr>
                <TableComponent shortURLData={this.state.shortURLData}></TableComponent>
                <ToastContainer />
                </Container>
            </>
        )
    }
}