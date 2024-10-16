import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "theme.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from 'pages/Dashboard'
import Layout from 'pages/common/Layout'
import Members from "pages/Members";
import EditMember from "pages/EditMember";
import AddMember from "pages/AddMember";
import IssueBook from "pages/IssueBook";
import ReturnBook from "pages/ReturnBook";
import Import from "pages/Import";
import Transaction from "pages/Transaction";




function App() {
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          {/* CssBaseLIne remove default mui css */}
          <CssBaseline />
          <Routes>
            <Route element={<Layout />} >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/management/edit/member/:id" element={<EditMember />} />
              <Route path="/add member" element={<AddMember />} />
              <Route path="/issue book" element={<IssueBook />} />
              <Route path="/return book" element={<ReturnBook />} />
              <Route path="/import" element={<Import />} />
              <Route path="/transactions" element={<Transaction />} />





            </Route>
          </Routes>

        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App