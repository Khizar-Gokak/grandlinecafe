import { useState } from 'react';
import Hero from '../components/Hero';
import CafeIntroSection from '../components/CafeIntroSection';
import SignatureMenuSection from '../components/SignatureMenuSection';
import CrewFavoritesSection from '../components/CrewFavoritesSection';
import CafeExperienceSection from '../components/CafeExperienceSection';
import CollectorsCornerSection from '../components/CollectorsCornerSection';
import CafeGallerySection from '../components/CafeGallerySection';
import CafeLocationContactSection from '../components/CafeLocationContactSection';
import GrandLineReservationModal from '../components/GrandLineReservationModal';

export default function Home({ onReplayIntro }) {
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  return (
    <div className="page-enter bg-[#F8F1E5] text-[#3D281D] overflow-x-hidden w-full max-w-full">
      {/* ===== HERO SECTION ===== */}
      <Hero onReplayIntro={onReplayIntro} />

      {/* ===== SECTION 1: CAFÉ INTRODUCTION & STORY ===== */}
      <CafeIntroSection onOpenReservation={() => setReservationModalOpen(true)} />

      {/* ===== SECTION 2: SIGNATURE MENU ===== */}
      <SignatureMenuSection />

      {/* ===== SECTION 3: CREW FAVORITES ===== */}
      <CrewFavoritesSection />

      {/* ===== SECTION 4: THE CAFÉ EXPERIENCE ===== */}
      <CafeExperienceSection onOpenReservation={() => setReservationModalOpen(true)} />

      {/* ===== SECTION 5: COLLECTOR'S CORNER ===== */}
      <CollectorsCornerSection />

      {/* ===== SECTION 6: EDITORIAL GALLERY ===== */}
      <CafeGallerySection />

      {/* ===== SECTION 7: LOCATION / CONTACT ===== */}
      <CafeLocationContactSection onOpenReservation={() => setReservationModalOpen(true)} />

      {/* ===== TABLE RESERVATION MODAL ===== */}
      <GrandLineReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
      />
    </div>
  );
}
