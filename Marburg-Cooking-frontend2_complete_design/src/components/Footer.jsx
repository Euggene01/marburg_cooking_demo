import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../context/languageContext";

export default function Footer() {
    const { language } = useLanguage();

    const labels = {
        de: {
            linksTitle: "Links",
            socialTitle: "Soziale Medien",
            impressum: "Impressum",
            datenschutz: "Datenschutz",
            contact: "Kontakt",
            sponsors: "Projektpartner",
            nextEvent: "Nächstes Event",
            projectTitle: "Über das Projekt",
            projectDescription:
                "„Marburg kocht\" ist ein gemeinschaftliches Koch-Event, bei dem Menschen zusammenkommen, neue Bekanntschaften knüpfen und gemeinsam einen unvergesslichen Abend erleben.",
            learnMore: "Mehr erfahren",
            copyright: "© {year} Marburg Kocht — Ein Projekt mit ❤️ in Marburg",
        },
        en: {
            linksTitle: "Links",
            socialTitle: "Social Media",
            impressum: "Imprint",
            datenschutz: "Privacy Policy",
            contact: "Contact",
            sponsors: "Project Partners",
            nextEvent: "Next Event",
            projectTitle: "About the Project",
            projectDescription:
                "\"Marburg Kocht\" is a community cooking event where people come together, meet new friends, and enjoy an unforgettable evening.",
            learnMore: "Learn More",
            copyright: "© {year} Marburg Kocht — A project with ❤️ in Marburg",
        },
    };

    const t = labels[language];

    return (
        <Box
            sx={{
                backgroundColor: "#F5E8C7",
                pt: 6,
                pb: 4,
                borderTop: "2px solid #E8D5B5",
                mt: 10,
            }}
        >
            {/* Top divider line */}
            <Box
                sx={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    mb: 5,
                }}
            />

            <Box
                sx={{
                    maxWidth: "1100px",
                    mx: "auto",
                    px: { xs: 3, md: 4 },
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "center", lg: "flex-start" },
                    gap: { xs: 6, lg: 4 },
                }}
            >
                {/* LEFT COLUMN - Links */}
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        maxWidth: { xs: "350px", lg: "none" },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            mb: 3,
                            color: "#2D3748",
                            fontSize: { xs: "1.3rem", md: "1.4rem" },
                            textAlign: { xs: "center", lg: "left" },
                        }}
                    >
                        {t.linksTitle}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
                            alignItems: { xs: "center", lg: "flex-start" },
                        }}
                    >
                        {[
                            { href: "https://cim-hub.de/impressum/", text: t.impressum },
                            { href: "https://cim-hub.de/datenschutz/", text: t.datenschutz },
                            { to: "/kontakt", text: t.contact },
                            { to: "/sponsoren", text: t.sponsors },
                            { to: "/naechstes-event", text: t.nextEvent },
                        ].map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "translateX(4px)",
                                    },
                                }}
                            >
                                <ArrowForwardIosIcon
                                    sx={{
                                        fontSize: "0.8rem",
                                        color: "#4CAF50",
                                        opacity: 0.7,
                                    }}
                                />
                                {item.to ? (
                                    <Link
                                        to={item.to}
                                        style={{
                                            color: "#4A5568",
                                            textDecoration: "none",
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.text}
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: "#4A5568",
                                            textDecoration: "none",
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.text}
                                    </a>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* CENTER COLUMN - Social Media */}
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        maxWidth: { xs: "350px", lg: "none" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            mb: 3,
                            color: "#2D3748",
                            fontSize: { xs: "1.3rem", md: "1.4rem" },
                            textAlign: "center",
                        }}
                    >
                        {t.socialTitle}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: { xs: 3, md: 4 },
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            {
                                icon: <FacebookIcon />,
                                href: "https://facebook.com",
                                color: "#1877F2",
                                label: "Facebook",
                            },
                            {
                                icon: <InstagramIcon />,
                                href: "https://instagram.com",
                                color: "#E4405F",
                                label: "Instagram",
                            },
                            {
                                icon: <MusicNoteIcon />,
                                href: "https://tiktok.com",
                                color: "#000000",
                                label: "TikTok",
                            },
                        ].map((social, index) => (
                            <IconButton
                                key={index}
                                component="a"
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                sx={{
                                    backgroundColor: "white",
                                    border: "2px solid #E2E8F0",
                                    width: { xs: 56, md: 60 },
                                    height: { xs: 56, md: 60 },
                                    color: social.color,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: social.color,
                                        color: "white",
                                        transform: "translateY(-3px)",
                                        boxShadow: `0 6px 15px ${social.color}40`,
                                    },
                                }}
                            >
                                {social.icon}
                            </IconButton>
                        ))}
                    </Box>
                </Box>

                {/* RIGHT COLUMN - Project Info */}
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        maxWidth: { xs: "350px", lg: "none" },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            mb: 3,
                            color: "#2D3748",
                            fontSize: { xs: "1.3rem", md: "1.4rem" },
                            textAlign: { xs: "center", lg: "left" },
                        }}
                    >
                        {t.projectTitle}
                    </Typography>

                    <Typography
                        sx={{
                            opacity: 0.9,
                            lineHeight: 1.7,
                            color: "#4A5568",
                            fontSize: "1rem",
                            mb: 3,
                            textAlign: { xs: "center", lg: "left" },
                            maxWidth: "300px",
                            mx: { xs: "auto", lg: 0 },
                        }}
                    >
                        {t.projectDescription}
                    </Typography>

                    <Box
                        sx={{
                            textAlign: { xs: "center", lg: "left" },
                        }}
                    >
                        <Link
                            to="/ueber-uns"
                            style={{
                                color: "#4CAF50",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            {t.learnMore} →
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* COPYRIGHT */}
            <Box
                sx={{
                    maxWidth: "1100px",
                    mx: "auto",
                    px: { xs: 3, md: 4 },
                    mt: 6,
                    pt: 4,
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        color: "#718096",
                        fontSize: "0.9rem",
                        fontWeight: 400,
                    }}
                >
                    {t.copyright.replace("{year}", new Date().getFullYear())}
                </Typography>
            </Box>
        </Box>
    );
}