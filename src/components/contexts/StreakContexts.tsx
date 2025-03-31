import { createContext, useContext, useState, ReactNode } from "react";

// THIS FILE ENSURES STREAK IS KEPT CONSISTENT DURING A RUN

interface StreakContextType {
  streak: number;
  incrementStreak: () => void;
  resetStreak: () => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const StreakProvider = ({ children }: { children: ReactNode }) => {
  const [streak, setStreak] = useState(0);

  const incrementStreak = () => setStreak((prev) => prev + 1);
  const resetStreak = () => setStreak(0);

  return (
    <StreakContext.Provider value={{ streak, incrementStreak, resetStreak }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
};
