import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Divider,
} from "@mui/material";

import { useState } from "react";
import { useLanguage } from "../context/languageContext";

export default function KitchenPage() {
  const { language } = useLanguage();

  const t = {
    de: {
      title: "Meine Küche",
      address: "Adresse",
      capacity: "Küchenkapazität",
      capacityOptions: ["2 Personen", "3 Personen", "4 Personen", "5 Personen", "5+"],
      equipment: "Ausstattung",
      stove: "Herdtyp",
      fridge: "Kühlschrankgröße",
      stoveOptions: ["Elektroherd", "Gasherd", "Induktion"],
      fridgeOptions: ["Klein", "Mittel", "Groß"],
      moreEquipment: "Weitere Ausstattung",
      micro: "Mikrowelle",
      mixer: "Mixer / Pürierstab",
      kettle: "Wasserkocher",
      extinguisher: "Feuerlöscher",
      accessibility: "Barrierefreiheit",
      floor: "Etage",
      elevator: "Fahrstuhl vorhanden",
      wheelchair: "Platz für Rollstuhl",
      parking: "Parkplatz verfügbar",
      petsQuestion: "Haustiere vorhanden?",
      whichPets: "Welche Haustiere?",
      allergies: "Allergie-Hinweise",
      notes: "Allgemeine Hinweise",
      save: "Speichern",
      saved: "Daten wurden gespeichert!",
      placeholderNotes: "Hinweise, Ruhezeiten, Besonderheiten...",
    },
    en: {
      title: "My Kitchen",
      address: "Address",
      capacity: "Kitchen Capacity",
      capacityOptions: ["2 people", "3 people", "4 people", "5 people", "5+"],
      equipment: "Equipment",
      stove: "Stove type",
      fridge: "Fridge size",
      stoveOptions: ["Electric", "Gas", "Induction"],
      fridgeOptions: ["Small", "Medium", "Large"],
      moreEquipment: "Additional Equipment",
      micro: "Microwave",
      mixer: "Mixer / Blender",
      kettle: "Kettle",
      extinguisher: "Fire extinguisher",
      accessibility: "Accessibility",
      floor: "Floor",
      elevator: "Elevator available",
      wheelchair: "Wheelchair space",
      parking: "Parking available",
      petsQuestion: "Pets in household?",
      whichPets: "Which pets?",
      allergies: "Allergy notes",
      notes: "General notes",
      save: "Save",
      saved: "Your data has been saved!",
      placeholderNotes: "Notes, quiet hours, special rules...",
    },
  }[language];

  const [form, setForm] = useState({
    address: "",
    capacity: "",
    stove: "",
    fridge: "",
    microwave: false,
    mixer: false,
    kettle: false,
    extinguisher: false,
    floor: "",
    elevator: false,
    wheelchair: false,
    parking: false,
    pets: false,
    petDetails: "",
    allergies: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheck = (e) =>
    setForm({ ...form, [e.target.name]: e.target.checked });

  const handleSubmit = () => {
    console.log("Kitchen Data:", form);
    alert(t.saved);
  };

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", px: 2, py: 4 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: 700, mb: 3 }}
      >
        {t.title}
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>

          {/* ADDRESS */}
          <TextField
            fullWidth
            label={t.address}
            name="address"
            value={form.address}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* CAPACITY */}
          <TextField
            fullWidth
            select
            label={t.capacity}
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            sx={{ mb: 4 }}
          >
            {t.capacityOptions.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          {/* EQUIPMENT */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {t.equipment}
          </Typography>

          {/* Stove */}
          <Typography sx={{ fontWeight: 600, mt: 2 }}>{t.stove}</Typography>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {t.stoveOptions.map((option) => (
              <Grid item xs={12} sm={4} key={option}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.stove === option}
                      onChange={() => setForm({ ...form, stove: option })}
                    />
                  }
                  label={option}
                />
              </Grid>
            ))}
          </Grid>

          {/* Fridge */}
          <Typography sx={{ fontWeight: 600 }}>{t.fridge}</Typography>
          <Grid container spacing={1} sx={{ mb: 3 }}>
            {t.fridgeOptions.map((option) => (
              <Grid item xs={12} sm={4} key={option}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.fridge === option}
                      onChange={() => setForm({ ...form, fridge: option })}
                    />
                  }
                  label={option}
                />
              </Grid>
            ))}
          </Grid>

          {/* More Equipment */}
          <Typography sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
            {t.moreEquipment}
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.microwave}
                    onChange={handleCheck}
                    name="microwave"
                  />
                }
                label={t.micro}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.kettle}
                    onChange={handleCheck}
                    name="kettle"
                  />
                }
                label={t.kettle}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.mixer}
                    onChange={handleCheck}
                    name="mixer"
                  />
                }
                label={t.mixer}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.extinguisher}
                    onChange={handleCheck}
                    name="extinguisher"
                  />
                }
                label={t.extinguisher}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* ACCESSIBILITY */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {t.accessibility}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t.floor}
                name="floor"
                value={form.floor}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.elevator}
                    onChange={handleCheck}
                    name="elevator"
                  />
                }
                label={t.elevator}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.wheelchair}
                    onChange={handleCheck}
                    name="wheelchair"
                  />
                }
                label={t.wheelchair}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.parking}
                    onChange={handleCheck}
                    name="parking"
                  />
                }
                label={t.parking}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* PETS */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {t.petsQuestion}
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={form.pets}
                onChange={handleCheck}
                name="pets"
              />
            }
            label={t.petsQuestion}
          />

          {form.pets && (
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label={t.whichPets}
              name="petDetails"
              value={form.petDetails}
              onChange={handleChange}
            />
          )}

          <Divider sx={{ my: 3 }} />

          {/* ALLERGIES */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {t.allergies}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* NOTES */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {t.notes}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            name="notes"
            placeholder={t.placeholderNotes}
            value={form.notes}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* SAVE BUTTON */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 4,
                py: 1.2,
                backgroundColor: "#7EBC89",
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#6aa97d" },
              }}
            >
              {t.save}
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
