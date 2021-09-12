import React, { Fragment, useState, useContext, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const UploadDetails = props => {

    const { handleSubmit, register } = useForm();

    const OnSubmit = (data, e) => {
        axios.post('http://192.168.1.180:3333/api/uploadDetails', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
        }).then(res => {
            toast.success('Upload Successful');
        }).catch(err => {
            toast.error(`Upload Fail with status: ${err.statusText}`);
        });
    };

    return (
        <Fragment>
            <Navbar />
            <ToastContainer />
            <Fragment className="mx-5">
                <Form onSubmit={handleSubmit(OnSubmit)}>
                    <FormGroup>
                        <Label>
                            Filename
                        </Label>
                        <input
                            type="text"
                            id="filename"
                            {...register("filename")}
                            placeholder="filename"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">
                            Save
                        </Button>
                    </FormGroup>
                </Form>
            </Fragment>
        </Fragment>
    );
};

export default UploadDetails;