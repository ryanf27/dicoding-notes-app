import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddNotePage from "./pages/AddNotePage";
import ArchivedNotesPage from "./pages/ArchivedNotesPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, getAccessToken } from "./utils/utils";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const hasToken = await getAccessToken();
    if (hasToken) {
      setIsAuthenticated(true);
    } else {
      const { error } = await getUserLogged();
      setIsAuthenticated(!error);
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/archive"
              element={
                isAuthenticated ? (
                  <ArchivedNotesPage />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            {isAuthenticated && (
              <>
                <Route path="/addnotepage" element={<AddNotePage />} />
                <Route path="/note/:id" element={<NoteDetailPage />} />
              </>
            )}
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate replace to="/login" />
                ) : (
                  <RegisterPage />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate replace to="/" /> : <LoginPage />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
