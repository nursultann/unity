import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import moment from "moment";
import { Box, Button, Container, TextField, Typography, Paper, Avatar, Snackbar, Alert } from "@mui/material";

const Chat = () => {
    const local = localStorage.getItem("token");
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

    const checkLogged = async () => {
        if (!local) {
            setUserDetails(null);
            window.location.href = "/";
        } else {
            const data = await axios.get(`${url}user-details`, { params: { uid: local } });
            if (data.data.status === 200) {
                setUserDetails(data.data.user[0]);
            }
        }
    };
    useEffect(() => {
        checkLogged();
        getMessages();
    }, []);
    const getMessages = async () => {
        const data = await axios.get(`${url}chats`);
        if (data.data.status === 200) {
            setMessages(data.data.messages);
        }
    };
    const postMessage = async () => {
        const params = {
            messages: value,
            user_id: userDetails.id,
            user_name: userDetails.name,
        };
        const data = await axios.post(`${url}chats`, null, { params });
        if (data.data.status === 200) {
            setValue("");
            getMessages();
            setSnackbarMessage("Сообщение добавлено!");
            setOpenSnackbar(true);
        }
    };
    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Баарлашуу
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, height: "400px", overflowY: "auto", mb: 2 }}>
                    {messages.length > 0 ? (
                        messages.map((i) => (
                            <Box
                                key={i.id}
                                display="flex"
                                justifyContent={i.user_id === userDetails?.id ? "flex-end" : "flex-start"}
                                mb={2}
                            >
                                <Box
                                    component={Paper}
                                    variant="outlined"
                                    p={2}
                                    sx={{
                                        maxWidth: "60%",
                                        bgcolor: i.user_id === userDetails?.id ? "primary.light" : "grey.200",
                                    }}
                                >
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                            {i.user_name[0]}
                                        </Avatar>
                                        <Typography variant="caption" color="text.secondary">
                                            {i.user_name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.primary">
                                        {i.message}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" align={i.user_id === userDetails?.id ? "right" : "left"} display="block">
                                        {moment(i.date).calendar()}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography color="text.secondary" align="center">
                            No messages yet
                        </Typography>
                    )}
                </Paper>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Билдирүү калтырыңыз..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    onClick={postMessage}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Билдирүү жөнөтүңүз
                </Button>

                {/* Snackbar for success message */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
            <Footer />
        </>
    );
};

export default Chat;
