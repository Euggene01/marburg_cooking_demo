import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import KontaktPage from "./pages/KontaktPage";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./pages/Dashboard";
import EventRegistration from "./pages/EventRegistration";

import ProfilePage from "./pages/ProfilePage";
import MyKitchenPage from "./pages/MyKitchenPage";




import ChatPage from "./pages/ChatPage";


export default function App() {
  return (
    <>
      <Header />

      
      
      
      <ScrollToTop /> 
      
      
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/after-party" element={<h1>After-Party Seite</h1>} />
        <Route path="/sponsoren" element={<h1>Sponsoren Seite</h1>} />
        <Route path="/ueber-uns" element={<h1>Über uns</h1>} />
        <Route path="/team" element={<h1>Team Seite</h1>} />
        <Route path="/faqs" element={<h1>FAQs Seite</h1>} />
        <Route path="/impressum" element={<h1>Impressum</h1>} />
        <Route path="/naechstes-event" element={<h1>Nächstes Event</h1>} />
        <Route path="/community" element={<h1>Community</h1>} />
        <Route path="/passwort-vergessen" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event-registration" element={<ProtectedRoute><EventRegistration /></ProtectedRoute> } />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute> } />
        <Route path="/meine-kueche" element={<MyKitchenPage />} />


        <Route path="/profil" element={<ProfilePage />} />

          
          
          
        {/* protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


           
        <Route path="/kontakt" element={<KontaktPage />} />

      </Routes>
      
      
      
      
        <Footer /> 
    </>
  );
}
