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
  Collapse,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";
import { useLanguage } from "../context/languageContext";
import { ENDPOINTS } from "../config/api";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { createEvent } from './../services/events';
import { useNavigate, useLocation } from "react-router-dom";


const API_BASE = import.meta.env.VITE_API_BASE || "";


export default function EventRegistration() {
  const { token,email } = useAuth();
  const { language } = useLanguage();
  const nav = useNavigate();
  const loc = useLocation();


  const t = {
    de: {
      introDate: "Wann? 23. Januar ab 18:00 Uhr",
      introPlace: "Wo? Marburg",
      introCost: "Kosten? Keine Kosten",

      chooseType: "Bitte wählen:",
      single: "Einzelanmeldung (mit automatischer Partnerzuteilung)",
      pair: "Wir melden uns als Team / Paar an",
      singleNote:
        "Deine persönlichen Angaben geben wir lediglich an deine/n Kochpartner:in weiter. Sollte der Gang bei dir stattfinden, erhalten auch deine Gäste deine Adresse.",

      title: "Eventformular",
      subtitle: "Deine persönlichen Angaben",
      subtitle2: "Wo findet der Gang statt?",

      addressNote:
        "Damit die Gäste dich/euch problemlos finden können, benötigen wir die exakte Adresse, an der der zugeteilte Gang stattfinden wird. Achte bitte auf die Vollständigkeit deiner Angaben.",

      firstname: "Vollständiger Name",
      email: "Email",
      phone: "Telefonnummer",
      age: "Alter",
      gender: "Geschlecht",
      profession: "Studiengang / Beruf",

      genders: {
        male: "Männlich",
        female: "Weiblich",
        nonbinary: "Nicht-binär",
        none: "Keine Angabe",
      },

      food: "Essensvorliebe",
      foods: {
        all: "Egal",
        vegan: "Vegan",
        vegetarian: "Vegetarisch",
        meat: "Mit Fleisch",
        fish: "Mit Fisch",
      },

      allergie: "Allergien",
      allergiesList: {
        lactose: "Laktoseintoleranz",
        gluten: "Glutenunverträglichkeit",
        none: "Keine",
        other: "Sonstiges",
      },

      p2: "Person 2",
      p2_fullname: "Vollständiger Name",
      p2_email: "E-Mail",
      p2_phone: "Handynummer",
      p2_age: "Alter *",
      p2_gender: "Geschlecht *",
      p2_profession: "Studiengang / Beruf",
      p2_food: "Essensvorliebe",
      p2_allergies: "Allergien",

      zipcode: "Postleitzahl",
      city: "Stadt",
      street: "Straße & Hausnummer",
      additional: "Adresszusatz (optional)",

      district: "Dein Stadtteil",
      districts: {
        west: "Westliche Kernstadt (Grassenberg, Marbach, Ockershausen, Stadtwald)",
        north: "Nördliche Kernstadt (MR-Nord, Wehrda)",
        inner:
          "Innere Kernstadt (Altstadt, Campusviertel, Weidenhausen, Südviertel)",
        east: "Östliche Kernstadt (Waldtal, Ortenberg, Lahnberge)",
        south:
          "Südliche Kernstadt (Südbahnhof, Hansenhaus, Richtsberg, Cappel)",
      },

      accessibility: "Barrierefreiheit",
      accOptions: {
        free: "Meine Wohnung ist barrierefrei",
        need: "Ich benötige Barrierefreiheit",
      },

      message: "Nachricht (optional)",
      submit: "Absenden",
      success: "Danke! Deine Anmeldung wurde erfolgreich gespeichert.",
      privacy: "Mit Absenden stimmst du der Verarbeitung deiner Daten zu.",
    },

    en: {
      introDate: "When? January 23rd from 6:00 PM",
      introPlace: "Where? Marburg",
      introCost: "Cost? Free of charge",

      chooseType: "Please choose:",
      single: "Single registration (automatic partner matching)",
      pair: "We register as a team / pair",
      singleNote:
        "Your personal data will only be shared with the partner assigned to you. If the course takes place at your home, your guests will receive your address.",

      title: "Event form",
      subtitle: "Your personal information",
      subtitle2: "Where will the course take place?",

      addressNote:
        "To ensure guests can easily find you, please enter the complete address where your assigned course will take place. Make sure all information is correct.",

      firstname: "Full name",
      email: "Email",
      phone: "Phone number",
      age: "Age",
      gender: "Gender",
      profession: "Field of study / occupation",

      genders: {
        male: "Male",
        female: "Female",
        nonbinary: "Non-binary",
        none: "Prefer not to say",
      },

      food: "Food preference",
      foods: {
        all: "No preference",
        vegan: "Vegan",
        vegetarian: "Vegetarian",
        meat: "With meat",
        fish: "With fish",
      },

      allergie: "Allergies",
      allergiesList: {
        lactose: "Lactose intolerance",
        gluten: "Gluten intolerance",
        none: "None",
        other: "Other",
      },

      p2: "Person 2",
      p2_fullname: "Full name",
      p2_email: "Email",
      p2_phone: "Phone number",
      p2_age: "Age",
      p2_gender: "Gender",
      p2_profession: "Field of study / occupation",
      p2_food: "Food preference",
      p2_allergies: "Allergies",

      zipcode: "Postcode",
      city: "City",
      street: "Street & house number",
      additional: "Additional info (optional)",

      district: "Your district",
      districts: {
        west: "Western city area",
        north: "Northern city area",
        inner: "Inner city area",
        east: "Eastern city area",
        south: "Southern city area",
      },

      accessibility: "Accessibility",
      accOptions: {
        free: "My home is accessible",
        need: "I require accessibility",
      },

      message: "Message (optional)",
      submit: "Submit",
      success: "Thank you! Your registration was saved successfully.",
      privacy: "By submitting you agree to the processing of your data.",
    },
  }[language];

  // ===================================================================
  // STATE
  // ===================================================================

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [accessibility, setAccessibility] = useState({
    free: false,
    need: false,
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emptyPerson = {
    fullname: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    profession: "",
    food: "",
    allergies: "",
    allergies_other: "",
  };

  const [p1, setP1] = useState({ ...emptyPerson, email: email || "" });
  const [p2, setP2] = useState({ ...emptyPerson });

  const [location, setLocation] = useState({
    zipcode: "",
    city: "",
    street: "",
    additional: "",
    message: "",
  });

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const autofillCity = (plz) => {
    if (["35037", "35039", "35041"].includes(plz)) {
      setLocation((prev) => ({ ...prev, city: "Marburg" }));
    }
  };

  // ===================================================================
  // VALIDATION
  // ===================================================================

  const validate = () => {
    setErrorMsg("");

    if (!selectedOption) {
      setErrorMsg(
        language === "de"
          ? "Bitte auswählen: Einzel oder Paar."
          : "Please choose: single or pair."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    // Person 1 required
    const requiredP1 = [
      ["fullname", t.firstname],
      ["email", t.email],
      ["phone", t.phone],
      ["age", t.age],
      ["gender", t.gender],
      ["profession", t.profession],
      ["food", t.food],
      ["allergies", t.allergie],
    ];

    for (let [key, label] of requiredP1) {
      if (!p1[key]?.trim()) {
        setErrorMsg(label.replace("*", "") + " ist erforderlich.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return false;
      }
    }

    if (!validateEmail(p1.email)) {
      setErrorMsg("Email Person 1 ist ungültig.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    if (p1.allergies === "other" && !p1.allergies_other.trim()) {
      setErrorMsg("Bitte Allergien (Person 1) ausfüllen.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    // Person 2
    if (selectedOption === "pair") {
      const requiredP2 = [
        ["fullname", t.p2_fullname],
        ["email", t.p2_email],
        ["phone", t.p2_phone],
        ["age", t.p2_age],
        ["gender", t.p2_gender],
        ["profession", t.p2_profession],
        ["food", t.p2_food],
        ["allergies", t.p2_allergies],
      ];

      for (let [key, label] of requiredP2) {
        if (!p2[key]?.trim()) {
          setErrorMsg(label.replace("*", "") + " ist erforderlich.");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return false;
        }
      }

      if (!validateEmail(p2.email)) {
        setErrorMsg("Email Person 2 ist ungültig.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return false;
      }

      if (p2.allergies === "other" && !p2.allergies_other.trim()) {
        setErrorMsg("Bitte Allergien (Person 2) ausfüllen.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return false;
      }
    }

    // Address required
    if (
      !location.zipcode.trim() ||
      !location.city.trim() ||
      !location.street.trim()
    ) {
      setErrorMsg("Adresse ist unvollständig.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    if (!selectedDistrict) {
      setErrorMsg("Bitte einen Stadtteil auswählen.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    return true;
  };

  // ===================================================================
  // SUBMIT
  // ===================================================================

  const resetForm = () => {
    setSelectedOption("");
    setSelectedDistrict("");
    setAccessibility({ free: false, need: false });
    setP1({ ...emptyPerson });
    setP2({ ...emptyPerson });
    setLocation({
      zipcode: "",
      city: "",
      street: "",
      additional: "",
      message: "",
    });
  };

const handleSubmit = async () => {

  if (!validate()) return;

  setLoading(true);
  setErrorMsg("");

  const payload = {
    type: selectedOption,
    person1: {
      ...p1,
      allergies_other: p1.allergies === "other" ? p1.allergies_other : "",
    },
    person2:
      selectedOption === "pair"
        ? { ...p2, allergies_other: p2.allergies === "other" ? p2.allergies_other : "" }
        : null,
    location: {
      zipcode: location.zipcode,
      city: location.city,
      street: location.street,
      additional: location.additional,
      district: selectedDistrict,
      message: location.message,
      accessibility: {
        free: accessibility.free,
        need: accessibility.need,
      },
    },
  };

  try {
    const data = await createEvent(payload, token);
    console.log("Event saved with ID:", data.id);

    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    resetForm();
    setTimeout(() => setSent(false), 6000);
  } catch (err) {
      if (err?.response?.status === 403) {
         localStorage.removeItem("token");
         localStorage.removeItem("email");
         localStorage.removeItem("username");
      localStorage.setItem("lastAuthChange", Date.now().toString());
         nav("/login", {
          state: { from: loc },
          replace: true,
        });
     
       }
    console.error(err);

    if (err.response && err.response.data?.message) {
      setErrorMsg(err.response.data.message);
    } else {
      setErrorMsg("Fehler beim Speichern.");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  } finally {
    setLoading(false);
  }
};



  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", px: 3, py: 4 }}>
      <Card sx={{ p: 4, borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          {/* INTRO */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {t.introDate}
          </Typography>
          <Typography>{t.introPlace}</Typography>
          <Typography sx={{ mb: 3 }}>{t.introCost}</Typography>

          {/* SUCCESS */}
          <Collapse in={sent}>
            <Alert severity="success" sx={{ mb: 2 }}>
              {t.success}
            </Alert>
          </Collapse>

          {/* ERROR */}
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          {/* TYPE */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            {t.chooseType}
          </Typography>

          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <FormControlLabel
              value="single"
              control={<Radio />}
              label={t.single}
            />
            <FormControlLabel value="pair" control={<Radio />} label={t.pair} />
          </RadioGroup>

          {selectedOption === "single" && (
            <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
              {t.singleNote}
            </Alert>
          )}

          <Divider sx={{ my: 3 }} />

          {/* GRID */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* LEFT BLOCK */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: "#FAEDCA",
                border: "2px solid #F2C078",
                borderRadius: 3,
              }}
            >
              <Typography sx={{ mb: 2 }}>{t.subtitle}</Typography>

              {/* PERSON 1 */}
              <TextField
                label={t.firstname}
                name="fullname"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={p1.fullname}
                onChange={(e) => setP1({ ...p1, fullname: e.target.value })}
              />

              <TextField
                label={t.email}
                name="email"
                fullWidth
                required
                disabled={!!email}
                sx={{ mb: 2 }}
                value={p1.email}
                onChange={(e) => setP1({ ...p1, email: e.target.value })}
              />

              <TextField
                label={t.phone}
                name="phone"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={p1.phone}
                onChange={(e) => setP1({ ...p1, phone: e.target.value })}
              />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  label={t.age}
                  name="age"
                  fullWidth
                  required
                  value={p1.age}
                  onChange={(e) => setP1({ ...p1, age: e.target.value })}
                />

                <TextField
                  select
                  label={t.gender}
                  name="gender"
                  fullWidth
                  required
                  value={p1.gender}
                  onChange={(e) => setP1({ ...p1, gender: e.target.value })}
                >
                  <MenuItem value="male">{t.genders.male}</MenuItem>
                  <MenuItem value="female">{t.genders.female}</MenuItem>
                  <MenuItem value="nonbinary">{t.genders.nonbinary}</MenuItem>
                  <MenuItem value="none">{t.genders.none}</MenuItem>
                </TextField>
              </Box>

              <TextField
                label={t.profession}
                fullWidth
                required
                sx={{ mb: 3 }}
                value={p1.profession}
                onChange={(e) => setP1({ ...p1, profession: e.target.value })}
              />

              {/* P1 Essen */}
              <TextField
                select
                label={t.food}
                name="food"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={p1.food}
                onChange={(e) => setP1({ ...p1, food: e.target.value })}
              >
                <MenuItem value="any">{t.foods.all}</MenuItem>
                <MenuItem value="vegan">{t.foods.vegan}</MenuItem>
                <MenuItem value="Vegetarian">{t.foods.vegetarian}</MenuItem>
                <MenuItem value="meat">{t.foods.meat}</MenuItem>
                <MenuItem value="fish">{t.foods.fish}</MenuItem>
              </TextField>

              {/* P1 Allergien */}
              <TextField
                select
                label={t.allergie}
                name="allergies"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={p1.allergies}
                onChange={(e) => setP1({ ...p1, allergies: e.target.value })}
              >
                <MenuItem value="lactose">{t.allergiesList.lactose}</MenuItem>
                <MenuItem value="gluten">{t.allergiesList.gluten}</MenuItem>
                <MenuItem value="none">{t.allergiesList.none}</MenuItem>
                <MenuItem value="other">{t.allergiesList.other}</MenuItem>
              </TextField>

              {p1.allergies === "other" && (
                <TextField
                  fullWidth
                  label={t.allergiesList.other}
                  sx={{ mb: 3 }}
                  value={p1.allergies_other}
                  onChange={(e) =>
                    setP1({ ...p1, allergies_other: e.target.value })
                  }
                />
              )}

              {/* PERSON 2 */}
              {selectedOption === "pair" && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {t.p2}
                  </Typography>

                  <TextField
                    label={t.p2_fullname}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={p2.fullname}
                    onChange={(e) => setP2({ ...p2, fullname: e.target.value })}
                  />

                  <TextField
                    label={t.p2_email}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={p2.email}
                    onChange={(e) => setP2({ ...p2, email: e.target.value })}
                  />

                  <TextField
                    label={t.p2_phone}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={p2.phone}
                    onChange={(e) => setP2({ ...p2, phone: e.target.value })}
                  />

                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                      label={t.p2_age}
                      fullWidth
                      required
                      value={p2.age}
                      onChange={(e) => setP2({ ...p2, age: e.target.value })}
                    />

                    <TextField
                      select
                      label={t.p2_gender}
                      fullWidth
                      required
                      value={p2.gender}
                      onChange={(e) => setP2({ ...p2, gender: e.target.value })}
                    >
                      <MenuItem value="male">{t.genders.male}</MenuItem>
                      <MenuItem value="female">{t.genders.female}</MenuItem>
                      <MenuItem value="nonbinary">
                        {t.genders.nonbinary}
                      </MenuItem>
                      <MenuItem value="none">{t.genders.none}</MenuItem>
                    </TextField>
                  </Box>

                  <TextField
                    label={t.p2_profession}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={p2.profession}
                    onChange={(e) =>
                      setP2({ ...p2, profession: e.target.value })
                    }
                  />

                  {/* P2 Essen */}
                  <TextField
                    select
                    label={t.p2_food}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={p2.food}
                    onChange={(e) => setP2({ ...p2, food: e.target.value })}
                  >
                    <MenuItem value="No preference">{t.foods.all}</MenuItem>
                    <MenuItem value="vegan">{t.foods.vegan}</MenuItem>
                    <MenuItem value="Vegetarian">{t.foods.vegetarian}</MenuItem>
                    <MenuItem value="meat">{t.foods.meat}</MenuItem>
                    <MenuItem value="fish">{t.foods.fish}</MenuItem>
                  </TextField>

                  {/* P2 Allergien */}
                  <TextField
                    select
                    label={t.p2_allergies}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={p2.allergies}
                    onChange={(e) =>
                      setP2({ ...p2, allergies: e.target.value })
                    }
                  >
                    <MenuItem value="lactose">
                      {t.allergiesList.lactose}
                    </MenuItem>
                    <MenuItem value="gluten">{t.allergiesList.gluten}</MenuItem>
                    <MenuItem value="none">{t.allergiesList.none}</MenuItem>
                    <MenuItem value="other">{t.allergiesList.other}</MenuItem>
                  </TextField>

                  {p2.allergies === "other" && (
                    <TextField
                      fullWidth
                      sx={{ mb: 2 }}
                      label={t.allergiesList.other}
                      value={p2.allergies_other}
                      onChange={(e) =>
                        setP2({ ...p2, allergies_other: e.target.value })
                      }
                    />
                  )}
                </>
              )}
            </Box>

            {/* RIGHT BLOCK */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: "#FAEDCA",
                border: "2px solid #F2C078",
                borderRadius: 3,
              }}
            >
              <Typography sx={{ mb: 2 }}>{t.subtitle2}</Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                {t.addressNote}
              </Alert>

              <TextField
                label={t.zipcode}
                fullWidth
                required
                sx={{ mb: 2 }}
                value={location.zipcode}
                onChange={(e) => {
                  setLocation({ ...location, zipcode: e.target.value });
                  if (e.target.value.length === 5) autofillCity(e.target.value);
                }}
              />

              <TextField
                label={t.city}
                fullWidth
                required
                sx={{ mb: 2 }}
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />

              <TextField
                label={t.street}
                fullWidth
                required
                sx={{ mb: 2 }}
                value={location.street}
                onChange={(e) =>
                  setLocation({ ...location, street: e.target.value })
                }
              />

              <TextField
                label={t.additional}
                fullWidth
                sx={{ mb: 3 }}
                value={location.additional}
                onChange={(e) =>
                  setLocation({ ...location, additional: e.target.value })
                }
              />

              {/* DISTRICT */}
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                {t.district}
              </Typography>

              <RadioGroup
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                sx={{ mb: 2 }}
              >
                <FormControlLabel
                  value="west"
                  control={<Radio />}
                  label={t.districts.west}
                />
                <FormControlLabel
                  value="north"
                  control={<Radio />}
                  label={t.districts.north}
                />
                <FormControlLabel
                  value="inner"
                  control={<Radio />}
                  label={t.districts.inner}
                />
                <FormControlLabel
                  value="east"
                  control={<Radio />}
                  label={t.districts.east}
                />
                <FormControlLabel
                  value="south"
                  control={<Radio />}
                  label={t.districts.south}
                />
              </RadioGroup>

              {/* Accessibility */}
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                {t.accessibility}
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessibility.free}
                    onChange={(e) =>
                      setAccessibility({
                        ...accessibility,
                        free: e.target.checked,
                      })
                    }
                  />
                }
                label={t.accOptions.free}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessibility.need}
                    onChange={(e) =>
                      setAccessibility({
                        ...accessibility,
                        need: e.target.checked,
                      })
                    }
                  />
                }
                label={t.accOptions.need}
              />

              <TextField
                label={t.message}
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 3 }}
                value={location.message}
                onChange={(e) =>
                  setLocation({ ...location, message: e.target.value })
                }
              />
            </Box>
          </Box>

          {/* SUBMIT */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ opacity: 0.7, mb: 1 }}>{t.privacy}</Typography>

            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{ py: 1.3, fontSize: "1.1rem", px: 4 }}
            >
              {loading ? <CircularProgress size={20} /> : t.submit}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
