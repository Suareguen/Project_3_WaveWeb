import "./SignupForm.css"

import { useState } from 'react';

import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Container,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    InputAdornment
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { signup } from "../../services/authService";
import { createProject } from "../../services/projectService";


function SignupComponent() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['User information', 'Project information', 'Subscription plan information'];


    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client', //Por defecto, siempre es 'client'
        project_name: '',
        project_type: '',
        company_name: '',
        sector: '',
        observations: '',
        payment_details: '',
        price: 0
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name: input, value } = e.target;
        setFormData({ ...formData, [input]: value });
        validateField(input, value);
    };

    const validateField = (input, value) => {
        let tempErrors = { ...errors };
        if (input === 'email') {
            tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? '' : 'Email is not valid.';
        }
        if (input === 'password') {
            tempErrors.password = value.length >= 8 ? '' : 'Password must be at least 8 characters.';
        }
        if (input === 'confirmPassword') {
            tempErrors.confirmPassword = value === formData.password ? '' : 'Passwords do not match.';
        }
        setErrors({ ...tempErrors });
    };



    const handlePlanSelect = (e) => {
        const plan = e.target.value;
        let projectType, planPrice;

        switch (plan) {
            case "Basic web":
                projectType = "Basic web";
                planPrice = 2000.00;
                break;
            case "Dynamic web":
                projectType = "Dynamic web";
                planPrice = 4000.00;
                break;
            case "E-Commerce":
                projectType = "E-Commerce";
                planPrice = 6000.00;
                break;
            default:
                projectType = "Basic web";
                planPrice = 2000.00;
        }

        setFormData({ ...formData, project_type: projectType, price: planPrice });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmitUser = async () => {
        try {
            const { first_name, last_name, email, password, role } = formData;
            const userData = { first_name, last_name, email, password, role };

            await signup(userData);

            handleNext();
        } catch (error) {
            console.error('Error creating user', error);

        }
    };

    const handleSubmitProject = async () => {
        try {
            const { project_name, company_name, sector, observations, project_type, price } = formData;
            const projectData = {
                project_name,
                company_name,
                sector,
                observations,
                project_type,
                price,

                progress_status: 0,
                plus_prototype: false,
                // devId: 2,
                clientId: parseInt(localStorage.getItem('userId')),
                // invoice_date: "2023-12-12",
                // amount: price,
                // payment_date: "2023-12-12",
                // payment_method: "Credit card",
                // payment_currency: "EUR"
            };
            console.log(projectData)
            await createProject(projectData);

            handleNext();
        } catch (error) {
            console.error('Error creating project', error);

        }
    };

    const handleFinish = () => {
        console.log('Oleeee tuuuuu!!!!');
        // Pendiente de opciones y pasarela de pago
    };



    return (
        <Container maxWidth="sm">
            <Stepper activeStep={activeStep} alternativeLabel sx={{ marginTop: '40px' }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <form>
                {activeStep === 0 && (
                    <>
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>User information:</Typography>
                        <TextField
                            label="Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.email && !errors.email && (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.password && !errors.password ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : null}
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            label="Confirm password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.confirmPassword && !errors.confirmPassword ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : null}
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Project information:</Typography>
                        <TextField
                            label="Project name"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Project type</InputLabel>
                            <Select
                                name="proyect_type"
                                value={formData.project_type}
                                onChange={handlePlanSelect}
                            >
                                <MenuItem value="Basic web">Basic web</MenuItem>
                                <MenuItem value="Dynamic web">Dynamic web</MenuItem>
                                <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Company name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Observations (0-300)"
                            name="observations"
                            multiline
                            rows={4}
                            value={formData.observations}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Subscription plan information:</Typography>
                        <TextField
                            label="Payment details (0-300)"
                            name="payment_details"
                            multiline
                            rows={4}
                            value={formData.observations}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={handleFinish}>Submit</Button>
                    ) : (
                        <>
                            {activeStep === 0 && (
                                <Button variant="contained" color="primary" onClick={handleSubmitUser}>Sign up</Button>
                            )}
                            {activeStep === 1 && (
                                <Button variant="contained" color="primary" onClick={handleSubmitProject}>Create project</Button>
                            )}
                        </>
                    )}
                </Box>
            </form>
        </Container>
    );
}

export default SignupComponent;
