import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";
import { url } from "../global_variables/variables";
import {
    Container,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Typography,
} from "@mui/material";

const Main = () => {
    const local = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [painment, setPainment] = useState(null);

    const pageTo = (url) => {
        window.location.href = url;
    }

    const checkLogged = async () => {
        if (!local) {
            setUserDetails(null);
            window.location.href = '/';
        } else {
            try {
                const data = await axios.get(`${url}user-details`, { params: { uid: local } });
                if (data.data.status === 200) {
                    setUserDetails(data.data.user[0]);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
    }

    const getTableDetails = async () => {
        try {
            const data = await axios.get(`${url}table-users`);
            if (data.data.status === 200) {
                setTableData(data.data.users);
            }
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    }

    const getPainmentReports = async () => {
        try {
            const data = await axios.get(`${url}report-painment`);
            if (data.data.status === 200) {
                setPainment(data.data.report_painment);
            }
        } catch (error) {
            console.error("Error fetching painment reports:", error);
        }
    }

    const search = (value) => {
        const results = tableData?.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.lastname.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(results?.length > 0 ? results : null);
    }

    useEffect(() => {
        checkLogged();
    }, []);

    useEffect(() => {
        getTableDetails();
        getPainmentReports();
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
                            <Typography variant="body1">
                                Бул тизмеге турак-жай кыймылсыз мүлк алуу үчүн кезекте турган жарандар кирет. 
                                Кезекке туруу үчүн сиздин атыңызда кыймылсыз мүлктүн жоктугун тастыктаган маалымкат керек.
                            </Typography>
                            <TextField
                                fullWidth
                                label="Издөө"
                                variant="outlined"
                                onChange={(e) => search(e.target.value)}
                                sx={{ mt: 3 }}
                            />
                        </Paper>
                        <TableContainer component={Paper} elevation={3} sx={{ mb: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Аты жөнү</TableCell>
                                        <TableCell>Кызмат көрсөтүүгө болгон төлөм</TableCell>
                                        <TableCell>Негизги эсеп</TableCell>
                                        <TableCell>Кезегиңизди аныктоочу эсебиңиз</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(searchResult || tableData)?.map((item, index) => (
                                        <TableRow 
                                            key={index} 
                                            sx={{ 
                                                bgcolor: item.status == 2 ? '#C8E6C9' : 'background.paper' 
                                            }}
                                        >
                                            <TableCell>
                                                {item.lastname} {item.name} {item.middname || ''}
                                                <Typography variant="caption" display="block" color="textSecondary">
                                                    {item.date_registr}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>2000</TableCell>
                                            <TableCell>20000</TableCell>
                                            <TableCell>{item.balance}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {userDetails?.status === 0 && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => pageTo('/edit')}
                                sx={{ mt: 2 }}
                            >
                                Тизмеге кошулуу
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                            <Typography variant="body1" gutterBottom>
                                Платформа аркылуу кыймылсыз мүлккө ээ болгон жарандардын тизмеси
                            </Typography>
                            <TextField
                                fullWidth
                                label="Издөө"
                                variant="outlined"
                                sx={{ mb: 3 }}
                            />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>№</TableCell>
                                            <TableCell>ФИО</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {painment?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.lastname} {item.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Main;
