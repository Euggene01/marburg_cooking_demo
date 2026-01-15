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
              backgroundColor: "#B9DFB3",
              py: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
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
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                />
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
                    gap: 2, // Mehr Abstand für bessere Lesbarkeit
                  }}
              >
                {/* Gemeinsame Styles für ALLE Navigationselemente */}
                {[
                  // Home Button
                  {
                    type: "link",
                    to: "/",
                    label: labels[language].home,
                    icon: <HomeIcon sx={{ color: "#2D7A3F", fontSize: "1.2rem" }} />
                  },
                  // Event Dropdown
                  {
                    type: "dropdown",
                    label: labels[language].event,
                    onClick: (e) => setEventMenuAnchor(e.currentTarget)
                  },
                  // Infos Dropdown
                  {
                    type: "dropdown",
                    label: labels[language].infos,
                    onClick: (e) => setInfoMenuAnchor(e.currentTarget)
                  },
                  // Sponsoren Link
                  {
                    type: "link",
                    to: "/sponsoren",
                    label: labels[language].sponsors
                  },
                  // FAQs Link
                  {
                    type: "link",
                    to: "/faqs",
                    label: labels[language].faqs
                  },
                  // Kontakt Link
                  {
                    type: "link",
                    to: "/kontakt",
                    label: labels[language].contact
                  },
                ].map((item, index) => (
                    item.type === "link" ? (
                        <Button
                            key={index}
                            component={Link}
                            to={item.to}
                            startIcon={item.icon}
                            sx={{
                              fontWeight: 600,
                              textTransform: "none",
                              fontSize: "1.1rem", // Größere Schrift
                              color: "#2D7A3F", // Gleiche Farbe wie Logo
                              minWidth: "auto",
                              px: 1.5,
                              py: 0.8,
                              borderRadius: "6px",
                              "&:hover": {
                                backgroundColor: "rgba(45, 122, 63, 0.1)",
                                textDecoration: "none",
                              },
                            }}
                        >
                          {item.label}
                        </Button>
                    ) : (
                        <Button
                            key={index}
                            endIcon={<ArrowDropDownIcon sx={{ color: "#2D7A3F" }} />}
                            onClick={item.onClick}
                            sx={{
                              fontWeight: 600,
                              textTransform: "none",
                              fontSize: "1.1rem", // Größere Schrift
                              color: "#2D7A3F", // Gleiche Farbe wie Logo
                              minWidth: "auto",
                              px: 1.5,
                              py: 0.8,
                              borderRadius: "6px",
                              "&:hover": {
                                backgroundColor: "rgba(45, 122, 63, 0.1)",
                                textDecoration: "none",
                              },
                            }}
                        >
                          {item.label}
                        </Button>
                    )
                ))}

                {/* EVENT Dropdown Menu */}
                <Menu
                    anchorEl={eventMenuAnchor}
                    open={Boolean(eventMenuAnchor)}
                    onClose={() => setEventMenuAnchor(null)}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                >
                  <MenuItem
                      component={Link}
                      to="/naechstes-event"
                      onClick={() => setEventMenuAnchor(null)}
                      sx={{ fontSize: "1rem", color: "#2D7A3F" }}
                  >
                    {labels[language].nextEvent}
                  </MenuItem>
                  <MenuItem
                      component={Link}
                      to="/after-party"
                      onClick={() => setEventMenuAnchor(null)}
                      sx={{ fontSize: "1rem", color: "#2D7A3F" }}
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
                        mt: 1,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                >
                  <MenuItem
                      component={Link}
                      to="/ueber-uns"
                      onClick={() => setInfoMenuAnchor(null)}
                      sx={{ fontSize: "1rem", color: "#2D7A3F" }}
                  >
                    {labels[language].aboutUs}
                  </MenuItem>
                  <MenuItem
                      component={Link}
                      to="/community"
                      onClick={() => setInfoMenuAnchor(null)}
                      sx={{ fontSize: "1rem", color: "#2D7A3F" }}
                  >
                    {labels[language].community}
                  </MenuItem>
                  <MenuItem
                      component={Link}
                      to="/team"
                      onClick={() => setInfoMenuAnchor(null)}
                      sx={{ fontSize: "1rem", color: "#2D7A3F" }}
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
                    gap: 1.5, // Mehr Abstand
                  }}
              >
                {/* Social Icons */}
                <IconButton
                    component="a"
                    href="https://facebook.com"
                    target="_blank"
                    sx={{
                      color: "#FE5D26",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "rgba(254, 93, 38, 0.1)",
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
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "rgba(254, 93, 38, 0.1)",
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
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "rgba(254, 93, 38, 0.1)",
                      },
                    }}
                >
                  <MusicNoteIcon sx={{ fontSize: 28 }} />
                </IconButton>

                {/* LANGUAGE */}
                <IconButton
                    onClick={(e) => setLanguageAnchor(e.currentTarget)}
                    sx={{
                      color: "#FE5D26",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "rgba(254, 93, 38, 0.1)",
                      },
                    }}
                >
                  <LanguageIcon sx={{ fontSize: 28 }} />
                </IconButton>

                <Menu
                    anchorEl={languageAnchor}
                    open={Boolean(languageAnchor)}
                    onClose={() => setLanguageAnchor(null)}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
                            width: 40,
                            height: 40,
                            "&:hover": {
                              backgroundColor: "rgba(254, 93, 38, 0.1)",
                            },
                          }}
                      >
                        <AccountCircleIcon sx={{ fontSize: 32 }} />
                      </IconButton>

                      <Menu
                          anchorEl={userMenuAnchor}
                          open={Boolean(userMenuAnchor)}
                          onClose={() => setUserMenuAnchor(null)}
                          PaperProps={{
                            sx: {
                              mt: 1,
                              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            },
                          }}
                      >
                        <MenuItem
                            onClick={() => {
                              navigate("/dashboard");
                              setUserMenuAnchor(null);
                            }}
                            sx={{ fontSize: "1rem" }}
                        >
                          {labels[language].userDashboard}
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                              navigate("/profil");
                              setUserMenuAnchor(null);
                            }}
                            sx={{ fontSize: "1rem" }}
                        >
                          {labels[language].userProfile}
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                              navigate("/meine-kueche");
                              setUserMenuAnchor(null);
                            }}
                            sx={{ fontSize: "1rem" }}
                        >
                          {language === "de" ? "Meine Küche" : "My Kitchen"}
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                              navigate("/einstellungen");
                              setUserMenuAnchor(null);
                            }}
                            sx={{ fontSize: "1rem" }}
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
                              fontSize: "1rem"
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
                          backgroundColor: "#FE5D26", // Orange wie Social Icons
                          color: "white",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "1.1rem", // Gleiche Schriftgröße wie Navigation
                          px: 3,
                          py: 0.9,
                          borderRadius: "8px",
                          ml: 1,
                          border: "2px solid #E54E1B",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          "&:hover": {
                            backgroundColor: "#E54E1B",
                            borderColor: "#CC4618",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
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
                      color: "#2D7A3F", // Gleiche Farbe wie Logo
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
              },
            }}
        >
          <Box sx={{ pt: 2 }}>
            <Box sx={{ textAlign: "center", mb: 2, px: 2 }}>
              <img
                  src={logo}
                  alt="Logo"
                  style={{ width: 80, borderRadius: "50%", marginBottom: 10 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#2D7A3F" }}>
                Marburg Kocht
              </Typography>
            </Box>

            <Divider />

            <List sx={{ px: 2 }}>
              {/* Mobile Navigation links - gleiche Schriftgröße wie Desktop */}
              {navLinks.map((link) => (
                  <ListItem key={link.path} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={link.path}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          py: 1.5,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "rgba(45, 122, 63, 0.08)",
                          },
                        }}
                    >
                      <ListItemText
                          primary={link.label}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            color: "#2D7A3F", // Gleiche Farbe wie Logo
                            fontSize: "1.1rem", // Gleiche Schriftgröße
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
                      "&:hover": {
                        backgroundColor: "rgba(45, 122, 63, 0.08)",
                      },
                    }}
                >
                  <ListItemText
                      primary={labels[language].contact}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: "#2D7A3F", // Gleiche Farbe wie Logo
                        fontSize: "1.1rem", // Gleiche Schriftgröße
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
                          fontSize: "1.1rem", // Gleiche Schriftgröße
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
                          backgroundColor: "#FE5D26",
                          fontWeight: 600,
                          fontSize: "1.1rem", // Gleiche Schriftgröße
                          "&:hover": {
                            backgroundColor: "#E54E1B",
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
                  sx={{ color: "#FE5D26" }}
              >
                <FacebookIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                  component="a"
                  href="https://www.instagram.com/marburg_kocht/"
                  target="_blank"
                  sx={{ color: "#FE5D26" }}
              >
                <InstagramIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                  component="a"
                  href="https://tiktok.com"
                  target="_blank"
                  sx={{ color: "#FE5D26" }}
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
                    color: "#2D7A3F", // Gleiche Farbe wie Logo
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1.1rem", // Gleiche Schriftgröße
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
              >
                <MenuItem
                    onClick={() => {
                      switchLanguage("de");
                      setLanguageAnchor(null);
                    }}
                    sx={{ fontSize: "1rem" }}
                >
                  Deutsch
                </MenuItem>
                <MenuItem
                    onClick={() => {
                      switchLanguage("en");
                      setLanguageAnchor(null);
                    }}
                    sx={{ fontSize: "1rem" }}
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