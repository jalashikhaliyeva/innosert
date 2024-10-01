import React from "react";
import Container from "../Container";

function ReportDescription({servicesInfo}) {
  console.log(servicesInfo, "servicesInfo");
  
  return (
    <>
      <Container>
        <div className="w-1/2 py-14">
          <h5 className="text-textSecondaryDefault text-3xl font-medium font-gilroy pb-7">
            Hesabat və analiz üzrə <br></br>
            xidmətlər nədir?
          </h5>

          <p className="font-gilroy text-grayButtonText  text-lg tracking-036 font-normal">
            Lorem ipsum dolor sit amet consectetur. Sed semper feugiat cursus
            nibh. Vel in dignissim amet dictum vitae. Consequat sed id commodo
            leo. Erat purus in vestibulum lacus id vitae nec pellentesque
            non.Lorem ipsum dolor sit amet consectetur. Ornare amet duis proin
            ut lorem amet ullamcorper malesuada. Vulputate parturient habitant
            nisi quis. Venenatis volutpat condimentum cursus ut vel. Felis ac in
            ipsum faucibus est turpis purus tellus.Lorem ipsum dolor sit amet
            consectetur. Ornare amet duis proin ut lorem amet ullamcorper
            malesuada. Vulputate parturient habitant nisi quis. Venenatis
            volutpat condimentum cursus ut vel. Felis ac in ipsum faucibus est
            turpis purus tellus.
          </p>
        </div>
      </Container>
    </>
  );
}

export default ReportDescription;
