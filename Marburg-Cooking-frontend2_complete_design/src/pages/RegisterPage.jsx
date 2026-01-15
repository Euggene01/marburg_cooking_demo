import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useLanguage } from "../context/languageContext";
import { registerUser } from "../services/auth";

export default function RegisterPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPassRepeat, setShowPassRepeat] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (password.length >= 12 && /[0-9]/.test(password) && /[A-Z]/.test(password))
      return 100;
    if (password.length >= 8) return 70;
    if (password.length >= 4) return 40;
    return 10;
  };

  const passwordsMatch = password && passwordRepeat && password === passwordRepeat;

  const labels = {
    de: {
      welcome: "Werde Teil von Marburg Kocht!",
      subtitle:
        "Registriere dich, um an Events teilzunehmen, Teams zu bilden und neue Menschen kennenzulernen.",
      message: "Das dauert weniger als 2 Minuten – starte jetzt dein Erlebnis.",
      registerTitle: "Registrierung",
      firstName: "Vorname",
      lastName: "Nachname",
      userName: "Benutzername",
      email: "Email",
      password: "Passwort",
      repeatPassword: "Passwort wiederholen",
      passwordMismatch: "Passwörter stimmen nicht überein",
      passwordShort: "Das Passwort muss mindestens 6 Zeichen haben",
      privacy: "Ich stimme den ",
      privacyLink: "Datenschutzbestimmungen",
      registerButton: "Account erstellen",
      alreadyRegistered: "Schon registriert?",
      loginLink: "Hier einloggen",
      backHome: "Zurück zur Startseite",
    },
    en: {
      welcome: "Join Marburg Kocht!",
      subtitle:
        "Register to participate in events, form teams, and meet new people.",
      message: "It takes less than 2 minutes – start your experience now.",
      registerTitle: "Registration",
      firstName: "First Name",
      lastName: "Last Name",
      userName: "Username",
      email: "Email",
      password: "Password",
      repeatPassword: "Repeat Password",
      passwordMismatch: "Passwords do not match",
      passwordShort: "Password must be at least 6 characters",
      privacy: "I agree to the ",
      privacyLink: "Privacy Policy",
      registerButton: "Create Account",
      alreadyRegistered: "Already registered?",
      loginLink: "Log in here",
      backHome: "Back to Home",
    },
  };

  const validate = () => {
    setError("");
    // if (!firstName.trim() || !lastName.trim()) {
    //   setError("Bitte Benutzernamen eintragen.");  
    //   return false;
    // }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Bitte eine gültige E-Mail-Adresse angeben.");
      return false;
    }
    if (password.length < 6) {
      setError(labels[language].passwordShort);
      return false;
    }
    if (!passwordsMatch) {
      setError(labels[language].passwordMismatch);
      return false;
    }
    if (!agreed) {
      setError("Bitte stimme der Datenschutzerklärung zu.");
      return false;
    }
    return true;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!validate()) return;

  setLoading(true);

  try {
    await registerUser({
      username: userName.trim(),
      email: email.trim(),
      password,
    });

    navigate("/login", { replace: true });
  } catch (err) {
    console.error(err);
    setError(err.message || "Registration failed. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        mt: 4,
      }}
    >
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
        {/* LEFT PANEL */}
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
            {labels[language].welcome}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            {labels[language].subtitle}
          </Typography>
          <Typography sx={{ opacity: 0.85, fontSize: "0.95rem" }}>
            {labels[language].message}
          </Typography>
        </Box>

        {/* RIGHT PANEL */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ borderRadius: 0, height: "100%" }}>
            <form onSubmit={handleSubmit}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                  {labels[language].registerTitle}
                </Typography>

                <TextField
                  label={labels[language].userName}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  label={labels[language].email}
                  type="email"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label={labels[language].password}
                  type={showPass ? "text" : "password"}
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                          {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <LinearProgress
                  variant="determinate"
                  value={getPasswordStrength()}
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    mb: 2,
                    backgroundColor: "#ddd",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        getPasswordStrength() > 70
                          ? "#4caf50"
                          : getPasswordStrength() > 40
                          ? "#ff9800"
                          : "#f44336",
                    },
                  }}
                />

                <TextField
                  label={labels[language].repeatPassword}
                  type={showPassRepeat ? "text" : "password"}
                  required
                  fullWidth
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  error={passwordRepeat.length > 0 && !passwordsMatch}
                  helperText={
                    passwordRepeat.length > 0 && !passwordsMatch
                      ? labels[language].passwordMismatch
                      : ""
                  }
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassRepeat(!showPassRepeat)} edge="end">
                          {showPassRepeat ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {labels[language].privacy}
                      <Link to="/datenschutz" style={{ color: "#FE5D26" }}>
                        {labels[language].privacyLink}
                      </Link>{" "}
                      zu.
                    </Typography>
                  }
                  sx={{ mb: 2 }}
                />

                {error && (
                  <Typography color="error" sx={{ mb: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!agreed || !passwordsMatch || password.length < 6 || loading}
                  sx={{
                    mt: 1,
                    py: 1.3,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    backgroundColor: !agreed ? "#ccc" : "#FE5D26",
                    "&:hover": { backgroundColor: agreed ? "#e75520" : "#ccc" },
                  }}
                >
                  {loading ? <CircularProgress size={22} /> : labels[language].registerButton}
                </Button>

                <Typography sx={{ mt: 2, textAlign: "center" }}>
                  {labels[language].alreadyRegistered}{" "}
                  <Link to="/login" style={{ color: "#FE5D26" }}>
                    {labels[language].loginLink}
                  </Link>
                </Typography>

                <Button
                  component={Link}
                  to="/"
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  fullWidth
                  sx={{ mt: 2, fontSize: "1rem" }}
                >
                  {labels[language].backHome}
                </Button>
              </CardContent>
            </form>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}