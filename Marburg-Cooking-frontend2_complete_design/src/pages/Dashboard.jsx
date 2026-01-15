import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/languageContext";
import EventIcon from '@mui/icons-material/Event';
import ChatIcon from '@mui/icons-material/Chat';

export default function Dashboard() {
    const { language } = useLanguage();

    const labels = {
        de: {
            title: "Willkommen zurück!",
            subtitle:
                "Schön, dass du wieder da bist. Was möchtest du als Nächstes tun?",
            registerTitle: "Für Event registrieren",
            registerDesc:
                "Melde dich schnell für das kommende 3-Gänge-Event an.",
            registerButton: "Eventformular öffnen",
            chatTitle: "Community Chat",
            chatDesc: "Stelle Fragen, tausche dich aus oder melde Probleme.",
            chatButton: "Chat starten",
        },
        en: {
            title: "Welcome back!",
            subtitle:
                "Great to see you again. What would you like to do next?",
            registerTitle: "Register for event",
            registerDesc:
                "Sign up easily for the upcoming 3-course event.",
            registerButton: "Open event form",
            chatTitle: "Community Chat",
            chatDesc:
                "Ask questions, connect with others or report issues.",
            chatButton: "Start chat",
        },
    };

    const t = labels[language];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                py: 4,
                backgroundColor: "background.default",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    p: { xs: 2, md: 4 },
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
                    borderRadius: { xs: 3, md: 6 },
                    border: "1px solid rgba(0,0,0,0.05)",
                    background: "#fff",
                }}
            >
                <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    {/* Header */}
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                mb: 1.5,
                                color: "#333",
                                fontSize: { xs: "2rem", md: "2.8rem" },
                                lineHeight: 1.2,
                            }}
                        >
                            {t.title}
                        </Typography>

                        <Typography
                            sx={{
                                mb: 4,
                                opacity: 0.8,
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                maxWidth: 600,
                                mx: "auto",
                                lineHeight: 1.6,
                                color: "#333",
                            }}
                        >
                            {t.subtitle}
                        </Typography>
                    </Box>

                    {/* Action Cards Grid */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                            gap: 4,
                            maxWidth: 900,
                            mx: "auto",
                        }}
                    >
                        {/* EVENT CARD */}
                        <Card
                            sx={{
                                borderRadius: 4,
                                p: { xs: 3, md: 4 },
                                textAlign: "center",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid rgba(0,0,0,0.05)",
                                height: "100%",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                {/* Icon - Grün */}
                                <Box sx={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: "50%",
                                    background: "rgba(76, 175, 80, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                    border: "2px solid #4CAF50"
                                }}>
                                    <EventIcon sx={{ fontSize: 36, color: "#4CAF50" }} />
                                </Box>

                                {/* Title - JETZT AUCH SCHWARZ/WIE COMMUNITY CHAT */}
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 2,
                                        color: "#333", // Schwarz/Dunkelgrau wie Community Chat
                                        fontSize: { xs: "1.4rem", md: "1.6rem" },
                                    }}
                                >
                                    {t.registerTitle}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    sx={{
                                        opacity: 0.85,
                                        lineHeight: 1.6,
                                        fontSize: { xs: "1rem", md: "1.05rem" },
                                        mb: 4,
                                        textAlign: "center",
                                    }}
                                >
                                    {t.registerDesc}
                                </Typography>

                                {/* Button - Grün */}
                                <Button
                                    component={Link}
                                    to="/event-registration"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#4CAF50",
                                        color: "white",
                                        px: { xs: 4, md: 5 },
                                        py: 1.5,
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#43A047",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)"
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {t.registerButton}
                                </Button>
                            </Box>
                        </Card>

                        {/* CHAT CARD */}
                        <Card
                            sx={{
                                borderRadius: 4,
                                p: { xs: 3, md: 4 },
                                textAlign: "center",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid rgba(0,0,0,0.05)",
                                height: "100%",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                {/* Icon - Orange */}
                                <Box sx={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: "50%",
                                    background: "rgba(255, 87, 34, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                    border: "2px solid #FF5722"
                                }}>
                                    <ChatIcon sx={{ fontSize: 36, color: "#FF5722" }} />
                                </Box>

                                {/* Title - Schwarz/Dunkelgrau */}
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 2,
                                        color: "#333", // Schwarz/Dunkelgrau
                                        fontSize: { xs: "1.4rem", md: "1.6rem" },
                                    }}
                                >
                                    {t.chatTitle}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    sx={{
                                        opacity: 0.85,
                                        lineHeight: 1.6,
                                        fontSize: { xs: "1rem", md: "1.05rem" },
                                        mb: 4,
                                        textAlign: "center",
                                    }}
                                >
                                    {t.chatDesc}
                                </Typography>

                                {/* Button - Orange */}
                                <Button
                                    component={Link}
                                    to="/chat"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#FF5722",
                                        color: "white",
                                        px: { xs: 4, md: 5 },
                                        py: 1.5,
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
                                        "&:hover": {
                                            backgroundColor: "#F4511E",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 6px 20px rgba(255, 87, 34, 0.6)"
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {t.chatButton}
                                </Button>
                            </Box>
                        </Card>
                    </Box>

                    {/* Footer */}
                    <Box sx={{
                        textAlign: "center",
                        mt: 6,
                        pt: 4,
                        borderTop: "1px solid rgba(0,0,0,0.1)"
                    }}>
                        <Typography sx={{
                            fontSize: "0.9rem",
                            opacity: 0.6,
                            color: "#4CAF50",
                            fontWeight: 500
                        }}>
                            Marburg Kocht • Community Cooking Events
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}