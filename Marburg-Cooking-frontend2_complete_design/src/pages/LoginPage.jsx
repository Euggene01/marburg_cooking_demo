import { Box, Card, CardContent, TextField, Typography, Button, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useLanguage } from "../context/languageContext";
import { useAuth } from "../context/authContext";
import { ENDPOINTS } from "../config/api";
import { loginUser } from "../services/auth";

export default function LoginPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const labels = {
    de: {
      welcome: "Willkommen zurück!",
      subtitle: "Melde dich an, um weiterzumachen und deine Marburg Kocht Events zu organisieren.",
      message: "Schön, dass du wieder da bist. Wir wünschen viel Spaß beim Kochen!",
      loginTitle: "Login",
      email: "Email oder Benutzername",
      emailOrUname: "Email oder Benutzername",
      password: "Passwort",
      forgotPassword: "Passwort vergessen?",
      loginButton: "Login",
      noAccount: "Noch keinen Account?",
      register: "Registrieren",
      backHome: "Zurück zur Startseite",
      invalidIdentifier: "Bitte Email oder gültigen Benutzernamen eingeben.",
      invalidPassword: "Das Passwort muss mindestens 6 Zeichen lang sein.",
    },
    en: {
      welcome: "Welcome back!",
      subtitle: "Log in to continue and manage your Marburg Kocht events.",
      message: "Great to have you back! Enjoy cooking together.",
      loginTitle: "Login",
      email: "Email or Username",
      emailOrUname: "Email or Username",
      password: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      noAccount: "Don't have an account?",
      register: "Register",
      backHome: "Back to Home",
      invalidIdentifier: "Please enter an email or valid username.",
      invalidPassword: "Password must be at least 6 characters.",
    }
  };

  const from = location.state?.from?.pathname || "/dashboard";

  // helper validators
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUsername = (v) => /^[a-zA-Z0-9_.-]{3,}$/.test(v); // min 3 chars, allowed . _ -

  const validate = () => {
    setError("");

    const id = form.identifier?.trim();
    if (!id) {
      setError(labels[language].invalidIdentifier);
      return false;
    }

    if (id.includes("@")) {
      // treat as email
      if (!isValidEmail(id)) {
        setError(labels[language].invalidIdentifier);
        return false;
      }
    } else {
      // treat as username
      if (!isValidUsername(id)) {
        setError(labels[language].invalidIdentifier);
        return false;
      }
    }

    if (!form.password || form.password.length < 6) {
      setError(labels[language].invalidPassword);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!validate()) return;

//   setLoading(true);

//   try {
//     const identifier = form.identifier.trim();

//     const payload = identifier.includes("@")
//       ? { usernameOrEmail: identifier, password: form.password }
//       : { usernameOrEmail: identifier, password: form.password };

//     const res = await fetch(ENDPOINTS.LOGIN, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       if (res.status === 401) {
//         throw new Error("Invalid username/email or password");
//       } else {
//         throw new Error("Login failed. Please try again later.");
//       }
//     }

//     const data = await res.json();

//     const token = data.token || data.access_token; 
//     if (!token) throw new Error("No token received from server");

//     login(token);

//     navigate(from, { replace: true });
//   } catch (err) {
//     console.error(err);
//     setError(err.message || "Login failed. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!validate()) return;

  setLoading(true);

  try {
    const identifier = form.identifier.trim();

    const {data} = await loginUser(identifier, form.password);
    
   login({
  token: data.token,
  username: data.username,
  email: data.email,
});
    navigate(from, { replace: true });
  } catch (err) {
    console.error(err);
    setError(err.message || "Login failed. Please try again later.");
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
          {/* Formular */}
          <form onSubmit={handleSubmit}>
            <Card sx={{ borderRadius: 0, height: "100%" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                  {labels[language].loginTitle}
                </Typography>

                {/* Identifier (email OR username) */}
                <TextField
                  label={labels[language].emailOrUname}
                  type="text"
                  name="identifier"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />

                {/* Password */}
                <TextField
                  label={labels[language].password}
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  fullWidth
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

                {/* Error Message */}
                {error && (
                  <Typography color="error" sx={{ fontSize: "0.9rem", mt: 1, mb: 1 }}>
                    {error}
                  </Typography>
                )}

                {/* Forgot Password */}
                <Typography sx={{ textAlign: "right", mb: 2 }}>
                  <Link
                    to="/passwort-vergessen"
                    style={{ color: "#FE5D26", fontSize: "0.9rem" }}
                  >
                    {labels[language].forgotPassword}
                  </Link>
                </Typography>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 1,
                    py: 1.3,
                    fontSize: "1.1rem",
                    backgroundColor: "#FE5D26",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#e75520" },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : labels[language].loginButton}
                </Button>

                {/* No Account */}
                <Typography sx={{ mt: 2, textAlign: "center" }}>
                  {labels[language].noAccount}{" "}
                  <Link to="/register" style={{ color: "#FE5D26" }}>
                    {labels[language].register}
                  </Link>
                </Typography>

                {/* Back to Home */}
                <Button
                  component={Link}
                  to="/"
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  fullWidth
                  sx={{
                    mt: 2,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  {labels[language].backHome}
                </Button>
              </CardContent>
            </Card>
          </form>
        </Box>
      </Box>
    </Box>
  );
}