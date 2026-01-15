import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider,
  MenuItem,
  Paper,
} from "@mui/material";

import { useLanguage } from "../context/languageContext";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {
  const { language, switchLanguage } = useLanguage();
  const { user, logout, email } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  // Dummy example – später vom Backend
  const isRegistered = user?.registeredForEvent || false;
  const pastEvents = user?.pastEvents || [];

  const [form, setForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: email || "",
    phone: user?.phone || "",
  });

  const labels = {
    de: {
      title: "Mein Profil",
      personalData: "Persönliche Daten",
      firstname: "Vorname",
      lastname: "Nachname",
      email: "Email",
      phone: "Telefonnummer",
      language: "Sprache",
      german: "Deutsch",
      english: "Englisch",

      eventStatus: "Event-Status",
      notRegistered: "Du bist noch nicht für das nächste Event registriert.",
      registered: "Du bist für das kommende Event registriert:",
      registerNow: "Jetzt registrieren",
      eventDate: "Datum",
      eventTime: "Uhrzeit",

      noPastEvents: "Du hast noch an keinem Event teilgenommen.",
      pastEvents: "Vergangene Events",

      edit: "Bearbeiten",
      save: "Speichern",
      cancel: "Abbrechen",

      changePassword: "Passwort ändern",
      newPassword: "Neues Passwort",
      confirmPassword: "Passwort bestätigen",
      updatePassword: "Passwort aktualisieren",

      dashboard: "Dashboard",
      logout: "Logout",
      nextEvent: "Nächstes Event",
    },

    en: {
      title: "My Profile",
      personalData: "Personal Data",
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      phone: "Phone Number",
      language: "Language",
      german: "German",
      english: "English",

      eventStatus: "Event Status",
      notRegistered: "You are not registered for the next event.",
      registered: "You are registered for the upcoming event:",
      registerNow: "Register now",
      eventDate: "Date",
      eventTime: "Time",

      noPastEvents: "You haven't participated in any events yet.",
      pastEvents: "Past Events",

      edit: "Edit",
      save: "Save",
      cancel: "Cancel",

      changePassword: "Change Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      updatePassword: "Update Password",

      dashboard: "Dashboard",
      logout: "Logout",
      nextEvent: "Next Event",
    },
  };

  const t = labels[language];

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Box sx={{ px: 2, py: 6 }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>

        {/* TITLE */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          {t.title}
        </Typography>

        {/* PERSONAL DATA */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {t.personalData}
            </Typography>

            {!editMode ? (
              <Box>
                <Typography><strong>{t.firstname}:</strong> {form.firstname}</Typography>
                <Typography><strong>{t.lastname}:</strong> {form.lastname}</Typography>
                <Typography><strong>{t.email}:</strong> {form.email}</Typography>
                <Typography><strong>{t.phone}:</strong> {form.phone || "–"}</Typography>

                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
                  {t.edit}
                </Button>
              </Box>
            ) : (
              <Box>
                <TextField
                  fullWidth
                  label={t.firstname}
                  name="firstname"
                  sx={{ mb: 2 }}
                  value={form.firstname}
                  onChange={handleFormChange}
                />

                <TextField
                  fullWidth
                  label={t.lastname}
                  name="lastname"
                  sx={{ mb: 2 }}
                  value={form.lastname}
                  onChange={handleFormChange}
                />

                <TextField
                  fullWidth
                  label={t.email}
                  name="email"
                  sx={{ mb: 2 }}
                  value={form.email}
                  onChange={handleFormChange}
                />

                <TextField
                  fullWidth
                  label={t.phone}
                  name="phone"
                  sx={{ mb: 2 }}
                  value={form.phone}
                  onChange={handleFormChange}
                />

                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#7EBC89", mr: 2 }}
                  onClick={() => setEditMode(false)}
                >
                  {t.save}
                </Button>

                <Button variant="text" onClick={() => setEditMode(false)}>
                  {t.cancel}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* EVENT STATUS */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {t.eventStatus}
            </Typography>

            {!isRegistered ? (
              <>
                <Typography sx={{ mb: 2 }}>{t.notRegistered}</Typography>

                <Button
                  component={Link}
                  to="/event-registration"
                  variant="contained"
                  sx={{ backgroundColor: "#FE5D26" }}
                >
                  {t.registerNow}
                </Button>
              </>
            ) : (
              <>
                <Typography sx={{ mb: 1, color: "green", fontWeight: 600 }}>
                  {t.registered}
                </Typography>

                <Paper
                  sx={{
                    p: 2,
                    mt: 1,
                    border: "1px solid #7EBC89",
                    backgroundColor: "#E8F6EC",
                  }}
                >
                  <Typography><strong>{t.eventDate}:</strong> 15.04.2025</Typography>
                  <Typography><strong>{t.eventTime}:</strong> 18:00</Typography>
                </Paper>
              </>
            )}

            <Divider sx={{ my: 3 }} />

            {/* PAST EVENTS */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              {t.pastEvents}
            </Typography>

            {pastEvents.length === 0 ? (
              <Typography sx={{ opacity: 0.7 }}>{t.noPastEvents}</Typography>
            ) : (
              <Box sx={{ mt: 1 }}>
                {pastEvents.map((ev, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: "1px solid #ddd",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <Typography><strong>{ev.title}</strong></Typography>
                    <Typography>{ev.date}</Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* LANGUAGE SWITCH */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {t.language}
            </Typography>

            <TextField
              select
              fullWidth
              value={language}
              onChange={(e) => switchLanguage(e.target.value)}
            >
              <MenuItem value="de">{t.german}</MenuItem>
              <MenuItem value="en">{t.english}</MenuItem>
            </TextField>
          </CardContent>
        </Card>

        {/* PASSWORD CHANGE */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {t.changePassword}
            </Typography>

            {!passwordMode ? (
              <Button variant="outlined" onClick={() => setPasswordMode(true)}>
                {t.changePassword}
              </Button>
            ) : (
              <Box>
                <TextField fullWidth label={t.newPassword} type="password" sx={{ mb: 2 }} />
                <TextField fullWidth label={t.confirmPassword} type="password" sx={{ mb: 2 }} />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#7EBC89",
                    mb: 1,
                  }}
                >
                  {t.updatePassword}
                </Button>

                <Button fullWidth variant="text" onClick={() => setPasswordMode(false)}>
                  {t.cancel}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* ACTION BUTTONS */}
        <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button component={Link} to="/dashboard" variant="contained">
            {t.dashboard}
          </Button>

          <Button
            onClick={logout}
            variant="outlined"
            sx={{ borderColor: "#FE5D26", color: "#FE5D26" }}
          >
            {t.logout}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
