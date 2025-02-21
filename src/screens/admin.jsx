import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import { Snackbar, Alert, TextField, Button, Container, Typography, Box } from "@mui/material";

const Admin = () => {
    const [user, setUser] = useState();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);  // To control Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for Snackbar

    const local = localStorage.getItem("adminToken");
    if (local != null) {
        window.location.href = "/admin-console";
    }

    const Login = async () => {
        const data = await axios({
            method: "get",
            url: url + "admin-details",
            params: {
                login: login,
                password: password,
            },
        });
        console.log("login", data);
        if (data.data.status === 200) {
            localStorage.setItem("adminToken", data.data.user[0].id);
            window.location.href = "/admin-console";
        } else {
            setSnackbarMessage("Неправильный логин или пароль!"); // Set error message
            setOpenSnackbar(true); // Show Snackbar
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: "150px" }}>
            <Box sx={{ backgroundColor: "#2196f3", padding: 5, borderRadius: 1 }}>
                <Typography variant="h5" align="center" color="white" gutterBottom>
                    Вход в Админ
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Логин"
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Пароль"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="secondary" fullWidth onClick={Login}>
                    Войти
                </Button>
            </Box>

            {/* Snackbar for error message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Admin;
