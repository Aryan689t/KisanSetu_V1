import React, { createContext, useContext, useState } from 'react';
import {
  initialCentres,
  initialCrops,
  initialTimeSlots,
  initialQueueItems,
  initialPastHistory,
  initialNotifications
} from '../mock/initialData';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  // Authentication & Public Flow State
  // Default is false so visitor/judge lands on the Landing Page first
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('landing'); // 'landing' | 'language' | 'login' | 'signup' | 'onboarding'
  const [currentUser, setCurrentUser] = useState({
    name: 'Ramesh Singh',
    mobile: '+91 98765 43210',
    role: 'farmer'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Navigation & Role State
  const [activeRole, setActiveRoleState] = useState('farmer'); // 'farmer' | 'operator' | 'admin'
  const [farmerTab, setFarmerTab] = useState('dashboard'); // 'dashboard' | 'centres' | 'queue' | 'history'

  // Language & Onboarding State (Strictly English & Hindi)
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Application Data State
  const [centres, setCentres] = useState(initialCentres);
  const [crops] = useState(initialCrops);
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  const [queueItems, setQueueItems] = useState(initialQueueItems);
  const [pastHistory, setPastHistory] = useState(initialPastHistory);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Dynamic Congestion Demo Condition ('NORMAL' | 'CONGESTED_SONIPAT')
  const [demoCondition, setDemoConditionState] = useState('NORMAL');
  
  // Alert Dismissal State
  const [dismissedRerouteAlert, setDismissedRerouteAlert] = useState(false);

  // Active Selected Booking (Ramesh Singh's Token SNP-014 by default)
  const activeBooking = queueItems.find(q => q.token === 'SNP-014') || queueItems[3];

  // Helper to switch role directly (used by demo bar and auth)
  const setActiveRole = (role) => {
    setActiveRoleState(role);
    setIsAuthenticated(true);
    if (role === 'farmer') {
      setCurrentUser({ name: 'Ramesh Singh', mobile: '+91 98765 43210', role: 'farmer' });
    } else if (role === 'operator') {
      setCurrentUser({ name: 'Operator #4 (Gate Control)', mobile: '+91 98000 00001', role: 'operator' });
    } else {
      setCurrentUser({ name: 'State Supervisor (DoCA)', mobile: '+91 98000 00002', role: 'admin' });
    }
  };

  // Auth Action: Log In
  const loginUser = (role = 'farmer', profile = null) => {
    setIsAuthenticated(true);
    setActiveRoleState(role);
    if (profile) {
      setCurrentUser(profile);
    } else if (role === 'farmer') {
      setCurrentUser({ name: 'Ramesh Singh', mobile: '+91 98765 43210', role: 'farmer' });
    } else if (role === 'operator') {
      setCurrentUser({ name: 'Operator #4 (Gate Control)', mobile: '+91 98000 00001', role: 'operator' });
    } else {
      setCurrentUser({ name: 'State Supervisor (DoCA)', mobile: '+91 98000 00002', role: 'admin' });
    }
    setAuthScreen('landing');
  };

  // Auth Action: Register
  const registerUser = ({ name, mobile, preferredLang }) => {
    if (preferredLang) setLang(preferredLang);
    setCurrentUser({
      name: name || 'Ramesh Singh',
      mobile: mobile || '+91 98765 43210',
      role: 'farmer'
    });
    setIsAuthenticated(true);
    setActiveRoleState('farmer');
    // Go to first-time farmer onboarding tutorial
    setAuthScreen('onboarding');
  };

  // Auth Action: Log Out
  const logoutUser = () => {
    setIsAuthenticated(false);
    setAuthScreen('landing');
    setIsSettingsOpen(false);
    setIsOnboardingOpen(false);
  };

  // Helper to add notification
  const addNotification = (title, message, type = 'info', forRole = 'farmer') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      message,
      type,
      read: false,
      forRole
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Mark all notifications as read
  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Compute recommended centre dynamically based on live telemetry load score
  const getRecommendedCentre = (centresList = centres) => {
    if (!centresList || centresList.length === 0) return initialCentres[0];
    
    // Score calculation: lower wait, lower capacity load, more slots, active counters -> better (lower) score
    const scored = centresList.map(c => {
      const score = (c.estWaitMinutes * 0.4) + (c.capacityPercent * 0.4) - (c.availableSlots * 0.5) - (c.activeCounters * 1.5) + (c.distanceKm * 0.2);
      return { ...c, score };
    });

    scored.sort((a, b) => a.score - b.score);
    return scored[0];
  };

  // Toggle or Set Demo Condition (Normal vs Congested Sonipat)
  // NOTE: Modifies ONLY live centres telemetry. Does NOT automatically change farmer booking!
  const setDemoCondition = (condition) => {
    setDemoConditionState(condition);
    setDismissedRerouteAlert(false); // Reset alert dismissal on scenario change

    if (condition === 'CONGESTED_SONIPAT') {
      setCentres(prev => prev.map(c => {
        if (c.id === 'cnt-sonipat') {
          return {
            ...c,
            queueCount: 34,
            estWaitMinutes: 67,
            capacityPercent: 94,
            status: 'CONGESTED',
            recommended: false,
            recommendationReason: 'Heavy truck backlog (~67 min wait).'
          };
        }
        if (c.id === 'cnt-panipat') {
          return {
            ...c,
            queueCount: 14,
            estWaitMinutes: 31,
            capacityPercent: 62,
            availableSlots: 11,
            status: 'NORMAL',
            recommended: true,
            recommendationReason: 'Optimal queue clearance & available capacity (~31 min wait).'
          };
        }
        return c;
      }));

      addNotification(
        '⚠️ Mandi Congestion Alert',
        'Sonipat Main Yard is experiencing heavy truck backlog (~67 min wait). Panipat Mandi (~31 min wait) is currently recommended.',
        'warning',
        'farmer'
      );
    } else {
      // Normal state
      setCentres(initialCentres);
      addNotification(
        'Mandi Telemetry Restored',
        'Restored normal yard capacity telemetry across state mandis.',
        'info',
        'farmer'
      );
    }
  };

  // Switch Booking Centre (Invoked ONLY when farmer explicitly clicks switch button)
  const switchBookingCentre = (newCentreId) => {
    const targetCentre = centres.find(c => c.id === newCentreId);
    if (!targetCentre) return;

    setQueueItems(prev => prev.map(item => {
      if (item.token === 'SNP-014') {
        return {
          ...item,
          centreId: targetCentre.id,
          centreName: targetCentre.name,
          counter: 'Counter 1 (Assigned)',
          slotTime: '11:30 AM - 12:00 PM'
        };
      }
      return item;
    }));

    setDismissedRerouteAlert(true);

    addNotification(
      'Mandi Rerouted Successfully!',
      `Token SNP-014 switched to ${targetCentre.name}. Estimated wait time reduced to ~${targetCentre.estWaitMinutes} mins.`,
      'success',
      'farmer'
    );
  };

  // Action 1: Book New Slot (Farmer)
  const bookSlot = ({ centreId, cropName, slotTime, expectedQty }) => {
    const centre = centres.find(c => c.id === centreId) || centres[0];
    const newTokenNum = `SNP-0${queueItems.length + 11}`;
    
    const newBooking = {
      token: newTokenNum,
      farmerName: currentUser.name ? `${currentUser.name} (YOU)` : 'Ramesh Singh (YOU)',
      mobile: currentUser.mobile || '+91 98765 43210',
      crop: cropName || 'Paddy (Grade A)',
      expectedQty: Number(expectedQty) || 40,
      actualQty: null,
      moisturePercent: null,
      qualityGrade: null,
      counter: 'Assigned on arrival',
      slotTime: slotTime || '11:30 AM - 12:00 PM',
      centreId: centre.id,
      centreName: centre.name,
      status: 'WAITING',
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bookingId: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ratePerQuintal: 2200,
      paymentStatus: 'PENDING'
    };

    setQueueItems(prev => [...prev, newBooking]);

    setCentres(prev => prev.map(c => {
      if (c.id === centreId) {
        return {
          ...c,
          queueCount: c.queueCount + 1,
          availableSlots: Math.max(0, c.availableSlots - 1)
        };
      }
      return c;
    }));

    addNotification(
      'Slot Booked Successfully!',
      `Token ${newTokenNum} generated for ${centre.name} (${slotTime}).`,
      'success',
      'farmer'
    );

    setFarmerTab('queue');
  };

  // Action 2: Check-In Farmer (Operator)
  const checkInFarmer = (tokenStr) => {
    setQueueItems(prev => prev.map(item => {
      if (item.token === tokenStr) {
        return { ...item, status: 'CHECKED_IN' };
      }
      return item;
    }));

    addNotification(
      'Farmer Checked-In',
      `Token ${tokenStr} marked as Checked In at gate control.`,
      'info',
      'operator'
    );

    if (tokenStr === 'SNP-014') {
      addNotification(
        'Check-in Confirmed',
        'You have successfully checked in at Sonipat Main Procurement Centre gate.',
        'success',
        'farmer'
      );
    }
  };

  // Action 3: Call Next Farmer (Operator)
  const callNextFarmer = (tokenStr = 'SNP-014', counterName = 'Counter 2') => {
    setQueueItems(prev => prev.map(item => {
      if (item.token === tokenStr) {
        return { ...item, status: 'PROCESSING', counter: counterName };
      }
      return item;
    }));

    addNotification(
      'Your Turn Has Arrived!',
      `Token ${tokenStr}: Please proceed to ${counterName} immediately for crop moisture & weight inspection.`,
      'warning',
      'farmer'
    );

    addNotification(
      'Farmer Called to Counter',
      `Called ${tokenStr} to ${counterName}.`,
      'info',
      'operator'
    );
  };

  // Action 4: Complete Procurement (Operator)
  const completeProcurement = ({ tokenStr = 'SNP-014', actualQty = 38.5, moisturePercent = 12.4, qualityGrade = 'Grade A' }) => {
    const qty = Number(actualQty);
    const rate = 2200;
    const totalPayout = Math.round(qty * rate);
    const formulaStr = `${qty} quintals × ₹${rate.toLocaleString()}/quintal = ₹${totalPayout.toLocaleString()}`;

    setQueueItems(prev => prev.map(item => {
      if (item.token === tokenStr) {
        return {
          ...item,
          status: 'COMPLETED',
          actualQty: qty,
          moisturePercent: Number(moisturePercent),
          qualityGrade,
          completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          paymentStatus: 'PENDING_DISBURSAL',
          totalAmount: totalPayout,
          formula: formulaStr
        };
      }
      return item;
    }));

    const newHistoryItem = {
      id: `HIST-2026-${Math.floor(10 + Math.random() * 90)}`,
      season: 'Kharif 2026',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      centre: 'Sonipat Main Procurement Centre',
      crop: 'Paddy (Grade A)',
      expectedQty: 40.0,
      actualQty: qty,
      ratePerQuintal: rate,
      totalAmount: totalPayout,
      formula: formulaStr,
      qualityGrade,
      moisturePercent: Number(moisturePercent),
      procurementStatus: 'COMPLETED',
      paymentStatus: 'PENDING_DISBURSAL',
      dbtReference: 'DBT-UTIB000984210 (Pending)',
      bankAccount: 'State Bank of India (****4092)'
    };

    setPastHistory(prev => [newHistoryItem, ...prev]);

    addNotification(
      'Procurement Completed!',
      `Weighed ${qty} Quintals (${qualityGrade}, ${moisturePercent}% Moisture). Calculation: ${formulaStr}. Awaiting Admin DBT Disbursal.`,
      'success',
      'farmer'
    );

    addNotification(
      'Procurement Submitted',
      `Completed inspection for ${tokenStr}. Payout: ₹${totalPayout.toLocaleString()}. Sent to Admin queue.`,
      'success',
      'operator'
    );
  };

  // Action 5: Admin Disburse Payment
  const disbursePayment = (tokenStr = 'SNP-014') => {
    let disbursedAmount = 84700;
    let farmerName = 'Ramesh Singh';

    setQueueItems(prev => prev.map(item => {
      if (item.token === tokenStr) {
        disbursedAmount = item.totalAmount || 84700;
        farmerName = item.farmerName.replace(' (YOU)', '');
        return { ...item, paymentStatus: 'DISBURSED' };
      }
      return item;
    }));

    setPastHistory(prev => prev.map(h => {
      if (h.paymentStatus === 'PENDING_DISBURSAL') {
        return {
          ...h,
          paymentStatus: 'DISBURSED',
          dbtReference: 'DBT-UTIB000984210'
        };
      }
      return h;
    }));

    addNotification(
      '₹ MSP Payment Disbursed!',
      `Direct Benefit Transfer of ₹${disbursedAmount.toLocaleString()} credited to SBI A/C ****4092. Ref: DBT-UTIB000984210.`,
      'success',
      'farmer'
    );

    addNotification(
      'DBT Payment Released',
      `Released payment of ₹${disbursedAmount.toLocaleString()} for ${farmerName} (${tokenStr}).`,
      'info',
      'admin'
    );
  };

  // Reset state to default baseline
  const resetDemoState = () => {
    setCentres(initialCentres);
    setTimeSlots(initialTimeSlots);
    setQueueItems(initialQueueItems);
    setPastHistory(initialPastHistory);
    setNotifications(initialNotifications);
    setFarmerTab('dashboard');
    setDemoConditionState('NORMAL');
    setDismissedRerouteAlert(false);
    addNotification('Demo State Reset', 'Restored initial mock dataset & normal load conditions.', 'info', activeRole);
  };

  return (
    <DemoContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        authScreen,
        setAuthScreen,
        currentUser,
        setCurrentUser,
        isSettingsOpen,
        setIsSettingsOpen,
        loginUser,
        registerUser,
        logoutUser,
        activeRole,
        setActiveRole,
        farmerTab,
        setFarmerTab,
        centres,
        crops,
        timeSlots,
        queueItems,
        pastHistory,
        notifications,
        activeBooking,
        demoCondition,
        setDemoCondition,
        dismissedRerouteAlert,
        setDismissedRerouteAlert,
        getRecommendedCentre,
        switchBookingCentre,
        bookSlot,
        checkInFarmer,
        callNextFarmer,
        completeProcurement,
        disbursePayment,
        resetDemoState,
        markNotificationsRead,
        lang,
        setLang,
        isOnboardingOpen,
        setIsOnboardingOpen
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
