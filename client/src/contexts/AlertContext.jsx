import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  // Optional: auto-dismiss after 3s
  const showAlert = useCallback((alertObj) => {
    setAlert(alertObj);
    if (alertObj && alertObj.autoClose !== false) {
      setTimeout(() => setAlert(null), 1000);
    }
  }, []);

  return (
    <AlertContext.Provider value={{ alert, setAlert: showAlert }}>
      {/* Alert UI */}
      {alert && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold
            ${alert.type === "error" ? "bg-red-600" : "bg-green-600"}
          `}
        >
          {alert.message}
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
