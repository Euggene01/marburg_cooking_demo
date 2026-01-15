import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Alert,
  Collapse
} from "@mui/material";
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
      upload: "Datei hochladen (optional)",
      submit: "Absenden",
      success: "Danke! Deine Nachricht wurde erfolgreich gesendet.",
      privacy: "Mit Absenden stimmst du der Verarbeitung deiner Daten zu.",
      subjects: {
        registration: "Anmeldung",
        event: "Frage zum Event",
        sponsoring: "Sponsoring",
        technical: "Technisches Problem",
        other: "Sonstiges",
      },
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
      upload: "Upload file (optional)",
      submit: "Send",
      success: "Thank you! Your message has been sent successfully.",
      privacy: "By submitting you agree to data processing.",
      subjects: {
        registration: "Registration",
        event: "Event Question",
        sponsoring: "Sponsoring",
        technical: "Technical Issue",
        other: "Other",
      },
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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
      <Card sx={{ width: 550, p: 3, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>

          {/* BESSERE, GROSSE SUCCESS MELDUNG */}
          <Collapse in={sent}>
            <Alert
              severity="success"
              sx={{
                mb: 3,
                p: 2,
                fontSize: "1.1rem",
                borderRadius: 2,
                backgroundColor: "#d4edda",
                color: "#155724",
              }}
            >
              {t.success}
            </Alert>
          </Collapse>

          <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
            {t.title}
          </Typography>

          <Typography sx={{ mb: 3, textAlign: "center", opacity: 0.9 }}>
            {t.subtitle}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label={t.firstname}
                name="vorname"
                required
                fullWidth
                value={form.vorname}
                onChange={handleChange}
              />

              <TextField
                label={t.lastname}
                name="nachname"
                required
                fullWidth
                value={form.nachname}
                onChange={handleChange}
              />
            </Box>

            <TextField
              label={t.email}
              name="email"
              type="email"
              required
              fullWidth
              sx={{ mt: 2 }}
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              label={t.phone}
              name="telefon"
              fullWidth
              sx={{ mt: 2 }}
              value={form.telefon}
              onChange={handleChange}
            />

            <TextField
              select
              label={t.subject}
              name="betreff"
              required
              fullWidth
              sx={{ mt: 2 }}
              value={form.betreff}
              onChange={handleChange}
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
              sx={{ mt: 2 }}
              value={form.nachricht}
              onChange={handleChange}
            />

            <Typography sx={{ mt: 2, fontSize: "0.85rem", opacity: 0.7 }}>
              {t.privacy}
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.3, fontSize: "1.1rem" }}
            >
              {t.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
