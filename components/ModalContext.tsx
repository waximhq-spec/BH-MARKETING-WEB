"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isProjectModalOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isProjectModalOpen: false,
  openProjectModal: () => {},
  closeProjectModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <ModalContext.Provider 
      value={{ 
        isProjectModalOpen, 
        openProjectModal: () => setIsProjectModalOpen(true), 
        closeProjectModal: () => setIsProjectModalOpen(false) 
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
