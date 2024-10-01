import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import "@/components/EmblaCarousel/embla.module.css";
import Footer from "@/components/Footer";
import withModalManagement from "@/shared/hoc/withModalManagement";
import ReportImageSection from "@/components/ReportImageSection";
import ReportDescription from "@/components/ReportDescription";
import { getServicesInfo } from "@/services/getServicesInfo";

function Report({ openRegisterModal, openLoginModal }) {
  const [servicesInfo, setServicesInfo] = useState(null);

    // Fetch services info
    useEffect(() => {
      const fetchServicesInfo = async () => {
        try {
          const data = await getServicesInfo();
          setServicesInfo(data);
        } catch (error) {
          console.error("Failed to fetch landing info:", error);
        }
      };
  
      fetchServicesInfo();
    }, []);
  return (
    <main>
      <Header openRegisterModal={openRegisterModal} />
      <ReportImageSection servicesInfo={servicesInfo} />
      <ReportDescription servicesInfo={servicesInfo} />
      <Container>
      <div style={{ paddingBottom: "10px" }}>
          <Footer />
        </div>
      </Container>
    </main>
  );
}

export default withModalManagement(Report);
