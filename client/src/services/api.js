import axios from 'axios';
export const serverUrl = "http://localhost:5000";
const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Request interceptor for adding auth token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (credentials) =>
        API.post('/api/users/login', credentials),
    register: (userData) =>
        API.post('/api/users/register', userData),
    forgotPassword: (userData) =>
        API.post('/api/users/forgotPassword', userData),
    verifyOtp: (otp, email) =>
        API.post(`/api/users/verifyOtp`, {otp, email}),

    resetPassword: (data) =>
        API.post('/api/users/resetPassword', data),    
    logout: () => {
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
    },
    getProfile() {
        return API.get('/api/users/me');
    },
};

// User APIs
export const userAPI = {
    updateProfile: (userData) =>
        API.put('/api/users/profile', userData),
    getReferralCode: () =>
        API.post('/api/referralCode'),
    getAllUsers: () =>
        API.get('/api/users/allUsers'),
    getTotalWalletBalance: () =>
        API.get('/api/users/totalWalletBalance'),
};

export const paymentAPI = {
    withdraw: (data) =>
        API.post('/api/payments/withdraw', data),
    getPayments: () =>
        API.get('/api/payments/get-payments'),
    updatePaymentStatus: (paymentId, status) =>
        API.put(`/api/payments/update-status/${paymentId}`, { status }),
    getAllPayments: () =>
        API.get('/api/payments/get-all-payments'),


    recharge: (formData) =>
        API.post('/api/recharge', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    getRecharges: () =>
        API.get('/api/recharge/get-recharges'),
    updateRechargeStatus: (rechargeId, status) =>
        API.put(`/api/recharge/update-status/${rechargeId}`, { status }),
    getUserRecharges: (userId) =>
        API.get(`/api/recharge/get-user-recharges?userId=${userId}`),

    wallet: {
        getUserWallet: (userId) =>
            API.get(`/api/wallet/get-wallet?userId=${userId}`),
    },
}; 

export const investmentAPI = {
    investInPlan: (data) =>
        API.post('/api/investment/invest', data),
    getUserInvestments: (userId) =>
        API.get(`/api/investment/getUserInvestments/${userId}`),
};

export default API;
