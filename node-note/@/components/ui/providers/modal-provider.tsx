"use client";

import { useEffect, useState } from "react";

import { CoverImageModal } from "../../ui/modals/cover-imgae-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <CoverImageModal />
    </>
  );
};