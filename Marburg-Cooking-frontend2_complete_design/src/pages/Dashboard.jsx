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
                background: "linear-gradient(135deg, #f9f7f0 0%, #f0ede5 100%)",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    p: { xs: 2, md: 4 },
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
                    borderRadius: { xs: 3, md: 6 },
                    border: "1px solid rgba(242, 192, 120, 0.2)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    {/* Header */}
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 1.5,
                                background: "linear-gradient(90deg, #7EBC89 0%, #FE5D26 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: { xs: "2rem", md: "2.8rem" },
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
                                lineHeight: 1.6
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
                        <Box
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: 4,
                                background: "linear-gradient(145deg, #FAEDCA 0%, #F8E6B5 100%)",
                                border: "2px solid #F2C078",
                                boxShadow: "0 8px 32px rgba(242, 192, 120, 0.2)",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                position: "relative",
                                overflow: "hidden",
                                "&:before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 60,
                                    height: 60,
                                    background: "#7EBC89",
                                    borderRadius: "0 0 0 40px",
                                    opacity: 0.1,
                                }
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 3,
                                gap: 2
                            }}>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 12,
                                    background: "rgba(126, 188, 137, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "2px solid #7EBC89"
                                }}>
                                    <EventIcon sx={{ fontSize: 28, color: "#7EBC89" }} />
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: "1.3rem", md: "1.5rem" },
                                        color: "#2c3e50",
                                    }}
                                >
                                    {t.registerTitle}
                                </Typography>
                            </Box>

                            <Box sx={{ flexGrow: 1, mb: 4 }}>
                                <Typography sx={{
                                    opacity: 0.9,
                                    lineHeight: 1.7,
                                    fontSize: "1.05rem"
                                }}>
                                    {t.registerDesc}
                                </Typography>
                            </Box>

                            <Button
                                component={Link}
                                to="/event-registration"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "#7EBC89",
                                    py: 1.6,
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    boxShadow: "0 6px 20px rgba(126, 188, 137, 0.3)",
                                    "&:hover": {
                                        backgroundColor: "#6aa97d",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 10px 25px rgba(126, 188, 137, 0.4)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {t.registerButton}
                            </Button>
                        </Box>

                        {/* CHAT CARD */}
                        <Box
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: 4,
                                background: "linear-gradient(145deg, #FAEDCA 0%, #F8E6B5 100%)",
                                border: "2px solid #FE5D26",
                                boxShadow: "0 8px 32px rgba(254, 93, 38, 0.15)",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                position: "relative",
                                overflow: "hidden",
                                "&:before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 60,
                                    height: 60,
                                    background: "#FE5D26",
                                    borderRadius: "0 0 0 40px",
                                    opacity: 0.1,
                                }
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 3,
                                gap: 2
                            }}>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 12,
                                    background: "rgba(254, 93, 38, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "2px solid #FE5D26"
                                }}>
                                    <ChatIcon sx={{ fontSize: 28, color: "#FE5D26" }} />
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: "1.3rem", md: "1.5rem" },
                                        color: "#2c3e50",
                                    }}
                                >
                                    {t.chatTitle}
                                </Typography>
                            </Box>

                            <Box sx={{ flexGrow: 1, mb: 4 }}>
                                <Typography sx={{
                                    opacity: 0.9,
                                    lineHeight: 1.7,
                                    fontSize: "1.05rem"
                                }}>
                                    {t.chatDesc}
                                </Typography>
                            </Box>

                            <Button
                                component={Link}
                                to="/chat"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "#FE5D26",
                                    py: 1.6,
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    boxShadow: "0 6px 20px rgba(254, 93, 38, 0.3)",
                                    "&:hover": {
                                        backgroundColor: "#e75520",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 10px 25px rgba(254, 93, 38, 0.4)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {t.chatButton}
                            </Button>
                        </Box>
                    </Box>

                    {/* Footer decorative */}
                    <Box sx={{
                        textAlign: "center",
                        mt: 6,
                        pt: 4,
                        borderTop: "1px solid rgba(242, 192, 120, 0.3)"
                    }}>
                        <Typography sx={{
                            fontSize: "0.9rem",
                            opacity: 0.6,
                            color: "#7EBC89",
                            fontWeight: 500
                        }}>
                            Marburg Cooks • Community Cooking Events
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}