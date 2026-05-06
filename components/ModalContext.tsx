"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isProjectModalOpen: boolean;
  modalMode: "project" | "booking";
  initialCategory: string | null;
  openProjectModal: (category?: string) => void;
  openBookingModal: () => void;
  closeProjectModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isProjectModalOpen: false,
  modalMode: "project",
  initialCategory: null,
  openProjectModal: () => {},
  openBookingModal: () => {},
  closeProjectModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"project" | "booking">("project");
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  return (
    <ModalContext.Provider 
      value={{ 
        isProjectModalOpen,
        modalMode, 
        initialCategory,
        openProjectModal: (category?: string) => {
          setModalMode("project");
          setInitialCategory(category || null);
          setIsProjectModalOpen(true);
        },
        openBookingModal: () => {
          setModalMode("booking");
          setIsProjectModalOpen(true);
        },
        closeProjectModal: () => {
          setIsProjectModalOpen(false);
          setTimeout(() => {
            setInitialCategory(null);
            setModalMode("project");
          }, 300);
        }
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
