import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Evenments from './pages/EventsPage';
import Homepage from "./pages/Homapage";
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Testimonials from './pages/Testimonials';

// Import des dashboards
import AdminDashboard from './pages/Admin/Dashboard';
import EmployeeManagement from './pages/Admin/EmployeeManagement';
import UserManagement from './pages/Admin/UserManagement';
import EventManagement from './pages/Admin/EventManagement';
import CitizenDashboard from './pages/Citizen/Dashboard';
import Profile from './pages/Citizen/Profile';
import Events from './pages/Citizen/Events';
import EmployeeDashboard from './pages/Employee/Dashboard';
import DocumentRequests from './pages/Citizen/DocumentRequests';
import NewDocumentRequest from './pages/Citizen/NewDocumentRequest';
import DocumentRequestsManagement from './pages/Employee/DocumentRequestsManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Homepage/>}/>
        <Route path="/evenements" element={<Evenments/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        
        {/* Routes Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRole="admin">
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute allowedRole="admin">
              <EventManagement />
            </ProtectedRoute>
          }
        />
        
        {/* Routes Citoyen */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRole="citizen">
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/requests"
          element={
            <ProtectedRoute allowedRole="citizen">
              <DocumentRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/new-request"
          element={
            <ProtectedRoute allowedRole="citizen">
              <NewDocumentRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/profile"
          element={
            <ProtectedRoute allowedRole="citizen">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/events"
          element={
            <ProtectedRoute allowedRole="citizen">
              <Events />
            </ProtectedRoute>
          }
        />
        
        {/* Routes Employé */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/document-requests"
          element={
            <ProtectedRoute allowedRole="employee">
              <DocumentRequestsManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
