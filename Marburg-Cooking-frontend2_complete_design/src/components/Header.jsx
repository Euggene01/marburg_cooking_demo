import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Menu,
    MenuItem,
    Container,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "../assets/logo 5.png";

import { useState } from "react";
import { useLanguage } from "../context/languageContext";
import { useAuth } from "../context/authContext";

export default function Header() {
    const navigate = useNavigate();
    const { language, switchLanguage } = useLanguage();
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Language Texts
    const labels = {
        de: {
            home: "Home",
            event: "Event",
            nextEvent: "Nächstes Event",
            afterParty: "After-Party",
            infos: "Infos",
            aboutUs: "Über uns",
            community: "Community",
            team: "Team",
            sponsors: "Sponsoren",
            faqs: "FAQs",
            contact: "Kontakt",
            login: "Login",
            logout: "Logout",
            userProfile: "Mein Profil",
            userSettings: "Einstellungen",
            userDashboard: "Dashboard",
        },
        en: {
            home: "Home",
            event: "Event",
            nextEvent: "Next Event",
            afterParty: "After-Party",
            infos: "Info",
            aboutUs: "About Us",
            community: "Community",
            team: "Team",
            sponsors: "Sponsors",
            faqs: "FAQs",
            contact: "Contact",
            login: "Login",
            logout: "Logout",
            userProfile: "My Profile",
            userSettings: "Settings",
            userDashboard: "Dashboard",
        },
    };

    // UI State
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [eventMenuAnchor, setEventMenuAnchor] = useState(null);
    const [infoMenuAnchor, setInfoMenuAnchor] = useState(null);
    const [languageAnchor, setLanguageAnchor] = useState(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const navLinks = [
        { label: labels[language].nextEvent, path: "/naechstes-event" },
        { label: labels[language].afterParty, path: "/after-party" },
        { label: labels[language].sponsors, path: "/sponsoren" },
        { label: labels[language].aboutUs, path: "/ueber-uns" },
        { label: labels[language].community, path: "/community" },
        { label: labels[language].team, path: "/team" },
        { label: labels[language].faqs, path: "/faqs" },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                elevation={1}
                sx={{
                    background: "rgba(185, 223, 179, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid rgba(45, 122, 63, 0.1)",
                    py: 1,
                    transition: "all 0.3s ease",
                }}
            >
                <Container maxWidth="xl" disableGutters>
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: { xs: 2, md: 3 },
                        }}
                    >
                        {/* LEFT = Logo */}
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        boxShadow: "0 4px 12px rgba(45, 122, 63, 0.2)",
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    ml: 2.5,
                                    fontWeight: 700,
                                    color: "#2D7A3F",
                                    fontSize: { xs: "1.4rem", md: "1.6rem" },
                                }}
                            >
                                Marburg Kocht
                            </Typography>
                        </Link>

                        {/* CENTER = Desktop Navigation */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {/* Home Button */}
                            <Button
                                component={Link}
                                to="/"
                                startIcon={<HomeIcon />}
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1.05rem",
                                    color: isActive("/") ? "#FE5D26" : "#2D7A3F",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "10px",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: isActive("/") ? "80%" : "0%",
                                        height: "3px",
                                        backgroundColor: "#FE5D26",
                                        borderRadius: "2px 2px 0 0",
                                        transition: "width 0.3s ease",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        transform: "translateY(-1px)",
                                        "&::after": {
                                            width: "80%",
                                        },
                                    },
                                }}
                            >
                                {labels[language].home}
                            </Button>

                            {/* Event Dropdown */}
                            <Button
                                endIcon={<ArrowDropDownIcon />}
                                onClick={(e) => setEventMenuAnchor(e.currentTarget)}
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1.05rem",
                                    color: "#2D7A3F",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "10px",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                {labels[language].event}
                            </Button>

                            {/* Infos Dropdown */}
                            <Button
                                endIcon={<ArrowDropDownIcon />}
                                onClick={(e) => setInfoMenuAnchor(e.currentTarget)}
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1.05rem",
                                    color: "#2D7A3F",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "10px",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                {labels[language].infos}
                            </Button>

                            {/* Sponsoren Link */}
                            <Button
                                component={Link}
                                to="/sponsoren"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1.05rem",
                                    color: isActive("/sponsoren") ? "#FE5D26" : "#2D7A3F",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "10px",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: isActive("/sponsoren") ? "80%" : "0%",
                                        height: "3px",
                                        backgroundColor: "#FE5D26",
                                        borderRadius: "2px 2px 0 0",
                                        transition: "width 0.3s ease",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        transform: "translateY(-1px)",
                                        "&::after": {
                                            width: "80%",
                                        },
                                    },
                                }}
                            >
                                {labels[language].sponsors}
                            </Button>

                            {/* FAQs Link */}
                            <Button
                                component={Link}
                                to="/faqs"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1.05rem",
                                    color: isActive("/faqs") ? "#FE5D26" : "#2D7A3F",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "10px",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: isActive("/faqs") ? "80%" : "0%",
                                        height: "3px",
                                        backgroundColor: "#FE5D26",
                                        borderRadius: "2px 2px 0 0",
                                        transition: "width 0.3s ease",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        transform: "translateY(-1px)",
                                        "&::after": {
                                            width: "80%",
                                        },
                                    },
                                }}
                            >
                                {labels[language].faqs}
                            </Button>

                            {/* Kontakt Link */}
                            <Button
                                component={Link}
                                to="/kontakt"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1.05rem",
                                    color: isActive("/kontakt") ? "#FE5D26" : "#2D7A3F",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "10px",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: isActive("/kontakt") ? "80%" : "0%",
                                        height: "3px",
                                        backgroundColor: "#FE5D26",
                                        borderRadius: "2px 2px 0 0",
                                        transition: "width 0.3s ease",
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        transform: "translateY(-1px)",
                                        "&::after": {
                                            width: "80%",
                                        },
                                    },
                                }}
                            >
                                {labels[language].contact}
                            </Button>

                            {/* EVENT Dropdown Menu */}
                            <Menu
                                anchorEl={eventMenuAnchor}
                                open={Boolean(eventMenuAnchor)}
                                onClose={() => setEventMenuAnchor(null)}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/naechstes-event"
                                    onClick={() => setEventMenuAnchor(null)}
                                    sx={{
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    {labels[language].nextEvent}
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/after-party"
                                    onClick={() => setEventMenuAnchor(null)}
                                    sx={{
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    {labels[language].afterParty}
                                </MenuItem>
                            </Menu>

                            {/* INFOS Dropdown Menu */}
                            <Menu
                                anchorEl={infoMenuAnchor}
                                open={Boolean(infoMenuAnchor)}
                                onClose={() => setInfoMenuAnchor(null)}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/ueber-uns"
                                    onClick={() => setInfoMenuAnchor(null)}
                                    sx={{
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    {labels[language].aboutUs}
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/community"
                                    onClick={() => setInfoMenuAnchor(null)}
                                    sx={{
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    {labels[language].community}
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/team"
                                    onClick={() => setInfoMenuAnchor(null)}
                                    sx={{
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    {labels[language].team}
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* RIGHT = Social + Language + User */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            {/* Social Icons */}
                            <IconButton
                                component="a"
                                href="https://facebook.com"
                                target="_blank"
                                sx={{
                                    color: "#FE5D26",
                                    width: 42,
                                    height: 42,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(254, 93, 38, 0.1)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <FacebookIcon />
                            </IconButton>

                            <IconButton
                                component="a"
                                href="https://www.instagram.com/marburg_kocht/"
                                target="_blank"
                                sx={{
                                    color: "#FE5D26",
                                    width: 42,
                                    height: 42,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(254, 93, 38, 0.1)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <InstagramIcon />
                            </IconButton>

                            <IconButton
                                component="a"
                                href="https://tiktok.com"
                                target="_blank"
                                sx={{
                                    color: "#FE5D26",
                                    width: 42,
                                    height: 42,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(254, 93, 38, 0.1)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <MusicNoteIcon />
                            </IconButton>

                            {/* LANGUAGE */}
                            <IconButton
                                onClick={(e) => setLanguageAnchor(e.currentTarget)}
                                sx={{
                                    color: "#FE5D26",
                                    width: 42,
                                    height: 42,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(254, 93, 38, 0.1)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <LanguageIcon />
                            </IconButton>

                            <Menu
                                anchorEl={languageAnchor}
                                open={Boolean(languageAnchor)}
                                onClose={() => setLanguageAnchor(null)}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        switchLanguage("de");
                                        setLanguageAnchor(null);
                                    }}
                                    sx={{
                                        fontWeight: language === "de" ? 700 : 400,
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    Deutsch
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        switchLanguage("en");
                                        setLanguageAnchor(null);
                                    }}
                                    sx={{
                                        fontWeight: language === "en" ? 700 : 400,
                                        fontSize: "1rem",
                                        py: 1.5,
                                        px: 3,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                            paddingLeft: "24px",
                                        },
                                    }}
                                >
                                    English
                                </MenuItem>
                            </Menu>

                            {/* USER MENU / LOGIN */}
                            {isAuthenticated ? (
                                <>
                                    <IconButton
                                        onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                                        sx={{
                                            color: "#FE5D26",
                                            width: 42,
                                            height: 42,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: "rgba(254, 93, 38, 0.1)",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>

                                    <Menu
                                        anchorEl={userMenuAnchor}
                                        open={Boolean(userMenuAnchor)}
                                        onClose={() => setUserMenuAnchor(null)}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                borderRadius: "12px",
                                                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                navigate("/dashboard");
                                                setUserMenuAnchor(null);
                                            }}
                                            sx={{
                                                fontSize: "1rem",
                                                py: 1.5,
                                                px: 3,
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(45, 122, 63, 0.08)",
                                                    paddingLeft: "24px",
                                                },
                                            }}
                                        >
                                            {labels[language].userDashboard}
                                        </MenuItem>

                                        <MenuItem
                                            onClick={() => {
                                                navigate("/profil");
                                                setUserMenuAnchor(null);
                                            }}
                                            sx={{
                                                fontSize: "1rem",
                                                py: 1.5,
                                                px: 3,
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(45, 122, 63, 0.08)",
                                                    paddingLeft: "24px",
                                                },
                                            }}
                                        >
                                            {labels[language].userProfile}
                                        </MenuItem>

                                        <MenuItem
                                            onClick={() => {
                                                navigate("/meine-kueche");
                                                setUserMenuAnchor(null);
                                            }}
                                            sx={{
                                                fontSize: "1rem",
                                                py: 1.5,
                                                px: 3,
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(45, 122, 63, 0.08)",
                                                    paddingLeft: "24px",
                                                },
                                            }}
                                        >
                                            {language === "de" ? "Meine Küche" : "My Kitchen"}
                                        </MenuItem>

                                        <MenuItem
                                            onClick={() => {
                                                navigate("/einstellungen");
                                                setUserMenuAnchor(null);
                                            }}
                                            sx={{
                                                fontSize: "1rem",
                                                py: 1.5,
                                                px: 3,
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(45, 122, 63, 0.08)",
                                                    paddingLeft: "24px",
                                                },
                                            }}
                                        >
                                            {labels[language].userSettings}
                                        </MenuItem>

                                        <Divider />

                                        <MenuItem
                                            onClick={() => {
                                                handleLogout();
                                                setUserMenuAnchor(null);
                                            }}
                                            sx={{
                                                color: "#FE5D26",
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                py: 1.5,
                                                px: 3,
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(254, 93, 38, 0.08)",
                                                    paddingLeft: "24px",
                                                },
                                            }}
                                        >
                                            {labels[language].logout}
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="contained"
                                    sx={{
                                        background: "linear-gradient(135deg, #FE5D26 0%, #E54E1B 100%)",
                                        color: "white",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        fontSize: "1.05rem",
                                        px: 3,
                                        py: 1,
                                        borderRadius: "10px",
                                        ml: 1,
                                        boxShadow: "0 4px 12px rgba(254, 93, 38, 0.3)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #E54E1B 0%, #CC4618 100%)",
                                            boxShadow: "0 6px 16px rgba(254, 93, 38, 0.4)",
                                            transform: "translateY(-2px)",
                                        },
                                    }}
                                >
                                    {labels[language].login}
                                </Button>
                            )}
                        </Box>

                        {/* MOBILE: Hamburger */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                sx={{
                                    color: "#2D7A3F",
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "rotate(90deg)",
                                    },
                                }}
                            >
                                <MenuIcon sx={{ fontSize: 32 }} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* MOBILE DRAWER */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        background: "rgba(255, 255, 255, 0.98)",
                        backdropFilter: "blur(10px)",
                    },
                }}
            >
                <Box sx={{ pt: 2 }}>
                    <Box sx={{ textAlign: "center", mb: 2, px: 2 }}>
                        <Box
                            sx={{
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    boxShadow: "0 4px 12px rgba(45, 122, 63, 0.2)",
                                    marginBottom: 10,
                                }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2D7A3F" }}>
                            Marburg Kocht
                        </Typography>
                    </Box>

                    <Divider />

                    <List sx={{ px: 2 }}>
                        {/* Home für Mobile */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/"
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 1,
                                    backgroundColor: isActive("/") ? "rgba(254, 93, 38, 0.1)" : "transparent",
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={labels[language].home}
                                    primaryTypographyProps={{
                                        fontWeight: 600,
                                        color: isActive("/") ? "#FE5D26" : "#2D7A3F",
                                        fontSize: "1.1rem",
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>

                        {/* Mobile Navigation links */}
                        {navLinks.map((link) => (
                            <ListItem key={link.path} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={link.path}
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: isActive(link.path) ? "rgba(254, 93, 38, 0.1)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={link.label}
                                        primaryTypographyProps={{
                                            fontWeight: 600,
                                            color: isActive(link.path) ? "#FE5D26" : "#2D7A3F",
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {/* Kontakt Link für Mobile */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/kontakt"
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 1,
                                    backgroundColor: isActive("/kontakt") ? "rgba(254, 93, 38, 0.1)" : "transparent",
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={labels[language].contact}
                                    primaryTypographyProps={{
                                        fontWeight: 600,
                                        color: isActive("/kontakt") ? "#FE5D26" : "#2D7A3F",
                                        fontSize: "1.1rem",
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>

                        <Divider sx={{ my: 2 }} />

                        {/* MOBILE LOGIN / LOGOUT */}
                        <ListItem disablePadding>
                            {isAuthenticated ? (
                                <Button
                                    onClick={() => {
                                        handleLogout();
                                        setDrawerOpen(false);
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        py: 1.5,
                                        color: "#FE5D26",
                                        borderColor: "#FE5D26",
                                        fontWeight: 600,
                                        fontSize: "1.1rem",
                                        "&:hover": {
                                            backgroundColor: "rgba(254, 93, 38, 0.1)",
                                            borderColor: "#FE5D26",
                                        },
                                    }}
                                >
                                    {labels[language].logout}
                                </Button>
                            ) : (
                                <Button
                                    component={Link}
                                    to="/login"
                                    onClick={() => setDrawerOpen(false)}
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        py: 1.5,
                                        background: "linear-gradient(135deg, #FE5D26 0%, #E54E1B 100%)",
                                        fontWeight: 600,
                                        fontSize: "1.1rem",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #E54E1B 0%, #CC4618 100%)",
                                        },
                                    }}
                                >
                                    {labels[language].login}
                                </Button>
                            )}
                        </ListItem>
                    </List>

                    <Divider sx={{ my: 2 }} />

                    {/* MOBILE SOCIAL */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            px: 2,
                            mb: 2,
                        }}
                    >
                        <IconButton
                            component="a"
                            href="https://facebook.com"
                            target="_blank"
                            sx={{
                                color: "#FE5D26",
                                width: 42,
                                height: 42,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(254, 93, 38, 0.1)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            <FacebookIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://www.instagram.com/marburg_kocht/"
                            target="_blank"
                            sx={{
                                color: "#FE5D26",
                                width: 42,
                                height: 42,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(254, 93, 38, 0.1)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            <InstagramIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://tiktok.com"
                            target="_blank"
                            sx={{
                                color: "#FE5D26",
                                width: 42,
                                height: 42,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(254, 93, 38, 0.1)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            <MusicNoteIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                    </Box>

                    {/* MOBILE LANGUAGE */}
                    <Box sx={{ textAlign: "center", px: 2, pb: 2 }}>
                        <Button
                            startIcon={<LanguageIcon sx={{ color: "#FE5D26" }} />}
                            onClick={(e) => setLanguageAnchor(e.currentTarget)}
                            sx={{
                                color: "#2D7A3F",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "1.1rem",
                            }}
                        >
                            {language === "de" ? "Deutsch" : "English"}
                        </Button>
                        <Menu
                            anchorEl={languageAnchor}
                            open={Boolean(languageAnchor)}
                            onClose={() => setLanguageAnchor(null)}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            PaperProps={{
                                sx: {
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    switchLanguage("de");
                                    setLanguageAnchor(null);
                                }}
                                sx={{
                                    fontSize: "1rem",
                                    py: 1.5,
                                    px: 3,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        paddingLeft: "24px",
                                    },
                                }}
                            >
                                Deutsch
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    switchLanguage("en");
                                    setLanguageAnchor(null);
                                }}
                                sx={{
                                    fontSize: "1rem",
                                    py: 1.5,
                                    px: 3,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                                        paddingLeft: "24px",
                                    },
                                }}
                            >
                                English
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}