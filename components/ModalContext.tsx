"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isProjectModalOpen: boolean;
  initialCategory: string | null;
  openProjectModal: (category?: string) => void;
  closeProjectModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isProjectModalOpen: false,
  initialCategory: null,
  openProjectModal: () => {},
  closeProjectModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  return (
    <ModalContext.Provider 
      value={{ 
        isProjectModalOpen, 
        initialCategory,
        openProjectModal: (category?: string) => {
          setInitialCategory(category || null);
          setIsProjectModalOpen(true);
        }, 
        closeProjectModal: () => {
          setIsProjectModalOpen(false);
          // Wait for animation before clearing
          setTimeout(() => setInitialCategory(null), 300);
        }
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
