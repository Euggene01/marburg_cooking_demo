import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/languageContext";

export default function ForgotPasswordPage() {
  const { language } = useLanguage();

  const labels = {
    de: {
      leftTitle: "Passwort vergessen?",
      leftSubtext: "Kein Problem! Wir helfen dir ganz schnell weiter.",
      leftDesc: "Gib deine E-Mail ein. Falls ein Konto existiert, senden wir dir einen Link zum Zurücksetzen.",
      resetTitle: "Passwort zurücksetzen",
      emailLabel: "Email",
      sendButton: "Link senden",
      emailSentTitle: "✓ E-Mail gesendet!",
      emailSentDesc: "Falls deine E-Mail existiert, erhältst du gleich einen Link.",
      resendButton: "Link erneut senden",
      backButton: "Zurück zum Login",
      timerText: "Erneut senden in",
    },
    en: {
      leftTitle: "Forgot Password?",
      leftSubtext: "No worries! We'll help you quickly.",
      leftDesc: "Enter your email. If an account exists, we’ll send a reset link.",
      resetTitle: "Reset Password",
      emailLabel: "Email",
      sendButton: "Send Link",
      emailSentTitle: "✓ Email Sent!",
      emailSentDesc: "If your email exists, you will receive a link shortly.",
      resendButton: "Resend Link",
      backButton: "Back to Login",
      timerText: "Resend in",
    },

  };

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let countdown;

    if (emailSent && timer > 0) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    }

    if (timer === 0) {
      setCanResend(true);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [emailSent, timer]);

  const handleSubmit = () => {
    if (email.length > 3) {
      setEmailSent(true);
      setTimer(30);
      setCanResend(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "80vh", alignItems: "center", justifyContent: "center", px: 2, mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1100px",
          backgroundColor: "background.paper",
          borderRadius: 4,
          boxShadow: 4,
          overflow: "hidden",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#7EBC89",
            color: "white",
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {labels[language].leftTitle}
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            {labels[language].leftSubtext}
          </Typography>

          <Typography sx={{ opacity: 0.8 }}>{labels[language].leftDesc}</Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ borderRadius: 0, height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              {!emailSent ? (
                <>
                  <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                    {labels[language].resetTitle}
                  </Typography>

                  <TextField
                    label={labels[language].emailLabel}
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                      py: 1.3,
                      fontSize: "1.1rem",
                      backgroundColor: "#FE5D26",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#e75520" },
                    }}
                  >
                    {labels[language].sendButton}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" sx={{ mb: 2, textAlign: "center", color: "#4caf50" }}>
                    {labels[language].emailSentTitle}
                  </Typography>

                  <Typography sx={{ mb: 3, textAlign: "center" }}>
                    {labels[language].emailSentDesc}
                  </Typography>

                  {!canResend ? (
                    <Typography sx={{ textAlign: "center", mb: 2, color: "gray", fontSize: "0.95rem" }}>
                      {labels[language].timerText} <strong>{timer}s</strong>
                    </Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleResend}
                      sx={{
                        mb: 2,
                        py: 1.1,
                        borderColor: "#7EBC89",
                        color: "#7EBC89",
                        "&:hover": { borderColor: "#6da979", backgroundColor: "rgba(126,188,137,0.1)" },
                      }}
                    >
                      {labels[language].resendButton}
                    </Button>
                  )}
                </>
              )}

              <Button
                component={Link}
                to="/login"
                variant="text"
                startIcon={<ArrowBackIcon />}
                fullWidth
                sx={{ mt: 2, fontSize: "1rem" }}
              >
                {labels[language].backButton}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
