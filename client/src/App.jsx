import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Topbar from './components/layout/Topbar'
import Footer from './components/layout/Footer'
import Signup from './auth/Signup'
import Login from './auth/Login'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect, useState } from 'react'
import ForgotPassword from './auth/ForgotPassword'
import OTPVerification from './auth/OTPVerification'
import ResetPassword from './auth/ResetPassword'
import Recharge from './pages/Recharge'
import Withdraw from './pages/Withdraw'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import WithdrawRequests from './pages/Dashboard/WithdrawRequests'
import DepositRequests from './pages/Dashboard/DepositRequests'
import History from './pages/History'
import { authAPI } from './services/api'


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await authAPI.getProfile();
            setUser(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
          }
        }
        setLoading(false);
      };
      checkAuth();
    }, []);
  return (
    <Router>
      <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/otp" element={<OTPVerification />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Tasks />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recharge"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Recharge />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdraw"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Withdraw />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <Layout>
                    <History />
                  </Layout>
                </ProtectedRoute>
              }
            />
       
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
            
            {user?.role === 'admin' && (
              <>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/withdraw-requests" element={<WithdrawRequests />} />
                <Route path="/deposit-requests" element={<DepositRequests />} />
              </>
            )}
          </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
      
    </Router>
  );
}

export default App;
