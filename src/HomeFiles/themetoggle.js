
import React, { useState, useEffect } from "react";
import "./theme.css";

function ThemeToggle() {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark-mode",
            darkMode
        );

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <button
            type="button"
            className="theme-button"
            onClick={() => setDarkMode(previous => !previous)}
            aria-label={
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            title={darkMode ? "Light Mode" : "Dark Mode"}
        >
            {darkMode ? "☀️" : "🌙"}
        </button>
    );
}

export default ThemeToggle;
