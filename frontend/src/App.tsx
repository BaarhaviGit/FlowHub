import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Upload from "./pages/Upload"

import WorkflowDetails from "./pages/WorkflowDetails"

import { AuthProvider } from "./context/AuthContext"

import { Toaster } from 'sonner'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="upload" element={<Upload />} />
            <Route path="workflow/:id" element={<WorkflowDetails />} />
          </Route>
        </Routes>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </Router>
  )
}

export default App
