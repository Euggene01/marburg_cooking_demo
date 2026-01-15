import { Link } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import { useLanguage } from "../context/languageContext";
import { useAuth } from "../context/authContext";

export default function LandingPage() {
    const { language } = useLanguage();
    const { isAuthenticated, logout } = useAuth();

    const labels = {
        de: {
            heroTitle: "Ein 3-Gänge-Menü – gekocht von euch, in der ganzen Stadt.",
            heroSubtext:
                "Lerne neue Menschen kennen, koche in kleinen Teams und erlebe ein einzigartiges Marburger Abendessen.",
            ctaButton: "Jetzt mitmachen",
            secondLink: "Mehr erfahren",
            howItWorks: "Wie funktioniert's?",
            features: [
                {
                    icon: "🧑‍🍳",
                    title: "Kochen in Teams",
                    text: "Erlebe ein spannendes Kochabenteuer in kleinen Gruppen – jeder Gang in einer anderen Küche.",
                },
                {
                    icon: "🤝",
                    title: "Neue Menschen kennenlernen",
                    text: "Bei jedem Gang triffst du neue Teams – ideal, um Menschen in Marburg zu treffen.",
                },
                {
                    icon: "🍽️",
                    title: "Gemeinsam genießen",
                    text: "Ein Abend voller Geschmack, Austausch und Spaß – das ist Marburg Kocht.",
                },
            ],
            // Auth Section
            welcomeBack: "Willkommen zurück!",
            whatNext: "Was möchtest du als Nächstes tun?",
            goDashboard: "Zum Dashboard",
            goNextEvent: "Zum nächsten Event",
            logout: "Logout",

            // Guest section
            joinTitle: "Bist du neu hier?",
            joinSubtext: "Registriere dich und mach mit!",
            registerButton: "Registrieren",
            alreadyMember: "Schon dabei?",
            loginButton: "Login",
        },

        en: {
            heroTitle: "A 3-course meal – cooked by you, across the city.",
            heroSubtext:
                "Meet new people, cook in small teams, and experience a unique Marburg dinner.",
            ctaButton: "Join Now",
            secondLink: "Learn More",
            howItWorks: "How it works?",
            features: [
                {
                    icon: "🧑‍🍳",
                    title: "Team Cooking",
                    text: "Enjoy an exciting cooking adventure in small groups – each course in a different kitchen.",
                },
                {
                    icon: "🤝",
                    title: "Meet New People",
                    text: "Meet new teams at every course – perfect for connecting with people in Marburg.",
                },
                {
                    icon: "🍽️",
                    title: "Enjoy Together",
                    text: "An evening full of flavor, interaction, and fun – that's Marburg Kocht.",
                },
            ],

            welcomeBack: "Welcome back!",
            whatNext: "What would you like to do next?",
            goDashboard: "Go to Dashboard",
            goNextEvent: "Go to Next Event",
            logout: "Logout",

            joinTitle: "New here?",
            joinSubtext: "Register and join the fun!",
            registerButton: "Register",
            alreadyMember: "Already a member?",
            loginButton: "Login",
        },
    };

    const t = labels[language];

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
            {/* HERO SECTION WITH IMPROVED CONTRAST */}
            <Box
                sx={{
                    minHeight: "80vh",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#4CAF50",
                }}
            >
                {/* Background image with blur effect */}
                <Box
                    component="img"
                    src="/images/hero-image.jpg"
                    alt="Gemeinsames Kochen in Marburg"
                    onError={(e) => {
                        e.target.style.display = "none";
                    }}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "blur(3px) brightness(0.7)",
                        zIndex: 0,
                    }}
                />

                {/* Dark overlay for better text contrast */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.4)", // Darker overlay
                        zIndex: 1,
                    }}
                />

                {/* Content with improved typography */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        color: "white",
                        textAlign: "center",
                        px: { xs: 3, md: 4 },
                        maxWidth: "900px",
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 3,
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            lineHeight: 1.2,
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        {t.heroTitle}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            maxWidth: "700px",
                            mb: 5,
                            mx: "auto",
                            fontSize: { xs: "1.1rem", md: "1.4rem" },
                            opacity: 0.95,
                            lineHeight: 1.6,
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                    >
                        {t.heroSubtext}
                    </Typography>

                    {/* Primary CTA Button */}
                    <Button
                        variant="contained"
                        component={Link}
                        to="/naechstes-event"
                        sx={{
                            backgroundColor: "#FF5722", // Brighter orange
                            color: "white",
                            px: { xs: 5, md: 6 },
                            py: { xs: 1.5, md: 1.8 },
                            fontSize: { xs: "1.1rem", md: "1.3rem" },
                            fontWeight: 700,
                            borderRadius: "12px",
                            boxShadow: "0 4px 20px rgba(255, 87, 34, 0.4)",
                            "&:hover": {
                                backgroundColor: "#F4511E",
                                boxShadow: "0 6px 25px rgba(255, 87, 34, 0.6)",
                                transform: "translateY(-2px)"
                            },
                            mb: 3,
                            transition: "all 0.3s ease",
                        }}
                    >
                        {t.ctaButton}
                    </Button>

                    {/* Secondary CTA Buttons */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        gap: 3,
                        mt: 2
                    }}>
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/ueber-uns"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                px: 4,
                                py: 1.2,
                                fontSize: "1rem",
                                fontWeight: 600,
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    borderColor: "white"
                                },
                            }}
                        >
                            {t.howItWorks}
                        </Button>

                        <Typography
                            component={Link}
                            to="/ueber-uns"
                            sx={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                borderBottom: "2px solid white",
                                py: 0.5,
                                alignSelf: "center",
                                "&:hover": {
                                    opacity: 0.9
                                }
                            }}
                        >
                            {t.secondLink}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* FEATURES SECTION WITH MORE SPACING */}
            <Box sx={{
                maxWidth: "1200px",
                mx: "auto",
                mt: { xs: 10, md: 12 },
                px: { xs: 3, md: 4 },
                pb: 6
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        textAlign: "center",
                        mb: { xs: 4, md: 6 },
                        color: "#333"
                    }}
                >
                    {language === "de" ? "So funktioniert's" : "How It Works"}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: { xs: 4, md: 5 },
                        maxWidth: "1200px",
                    }}
                >
                    {t.features.map((item) => (
                        <Card
                            key={item.title}
                            sx={{
                                flex: "1 1",
                                minWidth: { xs: "100%", sm: "300px", md: "320px" },
                                maxWidth: { xs: "100%", md: "350px" },
                                height: { xs: "280px", md: "300px" },
                                backgroundColor: "background.paper",
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
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <Typography sx={{
                                fontSize: { xs: "3.5rem", md: "4rem" },
                                mb: 2,
                                lineHeight: 1
                            }}>
                                {item.icon}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    color: "#2E7D32" // Darker green for headings
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                sx={{
                                    opacity: 0.85,
                                    lineHeight: 1.6,
                                    fontSize: { xs: "1rem", md: "1.05rem" }
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* AUTH SECTION */}
            <Box sx={{
                textAlign: "center",
                mt: 10,
                mb: { xs: 10, md: 12 },
                px: { xs: 3, md: 4 },
                maxWidth: "800px",
                mx: "auto"
            }}>
                {isAuthenticated ? (
                    <>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                color: "#333"
                            }}
                        >
                            {t.welcomeBack}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                opacity: 0.8,
                                mb: 5,
                                lineHeight: 1.6
                            }}
                        >
                            {t.whatNext}
                        </Typography>

                        {/* Action buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                justifyContent: "center",
                                gap: { xs: 3, md: 4 },
                            }}
                        >
                            {/* Dashboard */}
                            <Button
                                component={Link}
                                to="/dashboard"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    px: { xs: 4, md: 5 },
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "#43A047",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)"
                                    },
                                    transition: "all 0.3s ease",
                                    minWidth: { xs: "100%", md: "auto" }
                                }}
                            >
                                {t.goDashboard}
                            </Button>

                            {/* Next Event */}
                            <Button
                                component={Link}
                                to="/naechstes-event"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#FF5722",
                                    color: "white",
                                    px: { xs: 4, md: 5 },
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "#F4511E",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 20px rgba(255, 87, 34, 0.3)"
                                    },
                                    transition: "all 0.3s ease",
                                    minWidth: { xs: "100%", md: "auto" }
                                }}
                            >
                                {t.goNextEvent}
                            </Button>

                            {/* Logout */}
                            <Button
                                onClick={logout}
                                variant="outlined"
                                sx={{
                                    px: { xs: 4, md: 5 },
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    borderWidth: 2,
                                    borderColor: "#FF5722",
                                    color: "#FF5722",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        color: "#F4511E",
                                        borderColor: "#F4511E",
                                        backgroundColor: "rgba(255, 87, 34, 0.05)",
                                        transform: "translateY(-2px)"
                                    },
                                    transition: "all 0.3s ease",
                                    minWidth: { xs: "100%", md: "auto" }
                                }}
                            >
                                {t.logout}
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                color: "#333"
                            }}
                        >
                            {t.joinTitle}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 5,
                                opacity: 0.8,
                                lineHeight: 1.6
                            }}
                        >
                            {t.joinSubtext}
                        </Typography>

                        <Button
                            component={Link}
                            to="/register"
                            variant="contained"
                            sx={{
                                backgroundColor: "#FF5722",
                                color: "white",
                                px: { xs: 5, md: 6 },
                                py: 1.6,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#F4511E",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 20px rgba(255, 87, 34, 0.3)"
                                },
                                transition: "all 0.3s ease",
                                mb: 4
                            }}
                        >
                            {t.registerButton}
                        </Button>

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 5,
                                mb: 3,
                                fontWeight: 600
                            }}
                        >
                            {t.alreadyMember}
                        </Typography>

                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            sx={{
                                px: { xs: 5, md: 6 },
                                py: 1.6,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                borderWidth: 2,
                                borderColor: "#4CAF50",
                                color: "#4CAF50",
                                borderRadius: "10px",
                                "&:hover": {
                                    color: "#43A047",
                                    borderColor: "#43A047",
                                    backgroundColor: "rgba(76, 175, 80, 0.05)",
                                    transform: "translateY(-2px)"
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            {t.loginButton}
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}