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
import { Fragment, useContext, useEffect, useState } from 'react'
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
import { Dialog, Transition } from '@headlessui/react'
import Promotions from './pages/Promotions'
import AdminDashboardContent from './pages/Dashboard/AdminDashboardContent'
import LoadingSpinner from './components/LoadingSpinner'


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner message="Checking admin access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
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
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.data);
      
          // const isFirstLogin = sessionStorage.getItem('welcomeDialogShown');
      
          // if (!isFirstLogin && response?.data) {
          //   setShowWelcomeDialog(true);
          //   sessionStorage.setItem('welcomeDialogShown', 'true');
          // }
      
          // console.log(response.data);
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
    <>
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
              path="/packages"
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
            <Route
              path="/promotions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Promotions />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
              <Route index element={<AdminDashboardContent />} />
              <Route path="withdraw-requests" element={<WithdrawRequests />} />
              <Route path="deposit-requests" element={<DepositRequests />} />
            </Route>
       
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
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
    <Transition appear show={showWelcomeDialog} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={() => setShowWelcomeDialog(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
  
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900 mb-2">
                🚀 Introducing AutoCryptoInvest
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-700 mb-2">
                  Your Key to Guaranteed Daily Profits
                </p>
                <p className="text-sm text-gray-600">
                  Are you tired of the volatility and uncertainty of cryptocurrency investments? Look no further than AutoCryptoInvest, the revolutionary new app that guarantees fixed daily profits, regardless of market fluctuations.
                </p>
                <ul className="list-disc ml-5 mt-3 text-gray-600 text-sm">
                  <li><strong>Invest:</strong> Deposit your desired amount into the app, starting from as low as $30</li>
                  <li><strong>Choose Your Plan:</strong> Select from our range of investment plans</li>
                  <li><strong>Auto-Invest:</strong> Our algorithm will handle your crypto investments</li>
                  <li><strong>Earn Daily:</strong> Receive fixed daily profits, no matter what</li>
                </ul>
              </div>
  
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
                  onClick={() => setShowWelcomeDialog(false)}
                >
                  Got it!
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  </>
  );
}

export default App;
