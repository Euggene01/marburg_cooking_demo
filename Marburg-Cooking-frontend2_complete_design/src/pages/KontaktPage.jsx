import { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  MenuItem,
  Alert,
  Collapse,
  Container,
  Grid,
  IconButton
} from "@mui/material";
import {
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon
} from "@mui/icons-material";
import { useLanguage } from "../context/languageContext";
import emailjs from "@emailjs/browser";

export default function KontaktPage() {
  const { language } = useLanguage();

  const labels = {
    de: {
      title: "Kontakt",
      subtitle: "Hast du Fragen? Schreib uns gerne eine Nachricht.",
      firstname: "Vorname",
      lastname: "Nachname",
      email: "Email",
      phone: "Telefonnummer (optional)",
      subject: "Betreff",
      message: "Nachricht",
      submit: "Nachricht senden",
      success: "Danke! Deine Nachricht wurde erfolgreich gesendet.",
      privacy: "Mit Absenden stimmst du der Verarbeitung deiner Daten zu.",
      subjects: {
        registration: "Anmeldung",
        event: "Frage zum Event",
        sponsoring: "Sponsoring",
        technical: "Technisches Problem",
        other: "Sonstiges",
      },
      contactInfo: "Kontaktinformationen",
      directContact: "Direkter Kontakt",
      responseTime: "Wir antworten normalerweise innerhalb von 24 Stunden",
      hours: "Montag - Freitag\n9:00 - 18:00 Uhr",
    },
    en: {
      title: "Contact",
      subtitle: "Do you have any questions? Send us a message.",
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      phone: "Phone Number (optional)",
      subject: "Subject",
      message: "Message",
      submit: "Send Message",
      success: "Thank you! Your message has been sent successfully.",
      privacy: "By submitting you agree to data processing.",
      subjects: {
        registration: "Registration",
        event: "Event Question",
        sponsoring: "Sponsoring",
        technical: "Technical Issue",
        other: "Other",
      },
      contactInfo: "Contact Information",
      directContact: "Direct Contact",
      responseTime: "We usually respond within 24 hours",
      hours: "Monday - Friday\n9:00 AM - 6:00 PM",
    },
  };

  const t = labels[language];

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    betreff: "",
    nachricht: "",
  });

  const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
        .send(
            "service_z1530vs",
            "template_f8buz2y",
            {
              vorname: form.vorname,
              nachname: form.nachname,
              email: form.email,
              telefon: form.telefon,
              betreff: form.betreff,
              nachricht: form.nachricht,
            },
            "R1uYoUBPnhHbZalKx"
        )
        .then(() => {
          setSent(true);
          window.scrollTo({ top: 0, behavior: "smooth" });

          setForm({
            vorname: "",
            nachname: "",
            email: "",
            telefon: "",
            betreff: "",
            nachricht: "",
          });

          setTimeout(() => setSent(false), 6000);
        })
        .catch(() => {
          alert("Fehler beim Senden. Bitte später erneut versuchen.");
        });
  };

  return (
      <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #4CAF50 0%, #43A047 100%)",
            py: 8,
            px: 2,
          }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          {/* Success Message */}
          <Collapse in={sent}>
            <Alert
                icon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
                severity="success"
                sx={{
                  mb: 4,
                  p: 3,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  color: "#155724",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "2px solid #4CAF50",
                }}
            >
              {t.success}
            </Alert>
          </Collapse>

          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 2,
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  fontSize: { xs: "2.5rem", md: "3.5rem" }
                }}
            >
              {t.title}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: 600,
                  mx: "auto",
                }}
            >
              {t.subtitle}
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {/* Contact Form */}
            <Grid item xs={12} md={8} lg={7}>
              <Card
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    background: "#fff",
                  }}
              >
                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        label={t.firstname}
                        name="vorname"
                        required
                        fullWidth
                        value={form.vorname}
                        onChange={handleChange}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused fieldset": {
                              borderColor: "#4CAF50",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#4CAF50",
                          },
                        }}
                    />

                    <TextField
                        label={t.lastname}
                        name="nachname"
                        required
                        fullWidth
                        value={form.nachname}
                        onChange={handleChange}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused fieldset": {
                              borderColor: "#4CAF50",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#4CAF50",
                          },
                        }}
                    />
                  </Box>

                  <TextField
                      label={t.email}
                      name="email"
                      type="email"
                      required
                      fullWidth
                      value={form.email}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused fieldset": {
                            borderColor: "#4CAF50",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4CAF50",
                        },
                      }}
                  />

                  <TextField
                      label={t.phone}
                      name="telefon"
                      fullWidth
                      value={form.telefon}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused fieldset": {
                            borderColor: "#4CAF50",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4CAF50",
                        },
                      }}
                  />

                  <TextField
                      select
                      label={t.subject}
                      name="betreff"
                      required
                      fullWidth
                      value={form.betreff}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused fieldset": {
                            borderColor: "#4CAF50",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4CAF50",
                        },
                      }}
                  >
                    <MenuItem value="Anmeldung">{t.subjects.registration}</MenuItem>
                    <MenuItem value="Event">{t.subjects.event}</MenuItem>
                    <MenuItem value="Sponsoring">{t.subjects.sponsoring}</MenuItem>
                    <MenuItem value="Technik">{t.subjects.technical}</MenuItem>
                    <MenuItem value="Sonstiges">{t.subjects.other}</MenuItem>
                  </TextField>

                  <TextField
                      label={t.message}
                      name="nachricht"
                      required
                      fullWidth
                      multiline
                      rows={5}
                      value={form.nachricht}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused fieldset": {
                            borderColor: "#4CAF50",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4CAF50",
                        },
                      }}
                  />

                  <Typography
                      sx={{
                        fontSize: "0.85rem",
                        opacity: 0.7,
                        mb: 2,
                      }}
                  >
                    {t.privacy}
                  </Typography>

                  <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        py: 1.8,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        borderRadius: 2,
                        backgroundColor: "#FF5722",
                        boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
                        "&:hover": {
                          backgroundColor: "#F4511E",
                          boxShadow: "0 6px 20px rgba(255, 87, 34, 0.6)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                  >
                    {t.submit}
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* Contact Info Sidebar */}
            <Grid item xs={12} md={4} lg={5}>
              <Card
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    height: "100%",
                  }}
              >
                <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "#2E7D32",
                    }}
                >
                  {t.contactInfo}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton
                        sx={{
                          background: "linear-gradient(135deg, #4CAF50 0%, #43A047 100%)",
                          color: "#fff",
                          "&:hover": {
                            background: "linear-gradient(135deg, #43A047 0%, #388E3C 100%)",
                          },
                        }}
                    >
                      <EmailIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        info@example.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton
                        sx={{
                          background: "linear-gradient(135deg, #4CAF50 0%, #43A047 100%)",
                          color: "#fff",
                          "&:hover": {
                            background: "linear-gradient(135deg, #43A047 0%, #388E3C 100%)",
                          },
                        }}
                    >
                      <PhoneIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Telefon
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        +49 123 456 7890
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton
                        sx={{
                          background: "linear-gradient(135deg, #4CAF50 0%, #43A047 100%)",
                          color: "#fff",
                          "&:hover": {
                            background: "linear-gradient(135deg, #43A047 0%, #388E3C 100%)",
                          },
                        }}
                    >
                      <LocationOnIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Adresse
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        Musterstraße 123<br />
                        12345 Musterstadt
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                    sx={{
                      mt: 4,
                      pt: 4,
                      borderTop: "1px solid rgba(0,0,0,0.1)",
                    }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t.responseTime}
                  </Typography>
                  <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #4CAF50 0%, #43A047 100%)",
                        color: "#fff",
                        textAlign: "center",
                      }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {t.directContact}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9, whiteSpace: "pre-line" }}>
                      {t.hours}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
  );
}