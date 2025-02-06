import Image from "next/image";
import styles from "./Certificate.module.css";

const Certificate = ({ name, course, date, certNumber, percentage }) => {
  return (
    <div className={styles.certificateContainer}>
      <Image
        src="/img/certificate-blank.png"
        alt="Certificate"
        layout="fill"
        objectFit="contain"
        className={styles.certificateBg}
      />

      <div className={styles.certificateContent}>
        <div className="flex gap-3 flex-row items-center pt-7">
          <Image
            src="/img/innosert-logo.png"
            alt="Innosert Logo"
            width={80}
            height={20}
          />
          <Image
            src="/img/innosert-logo.png"
            alt="Innosert Logo"
            width={80}
            height={20}
          />
        </div>
        <h2 className={styles.title}>SERTİFİKAT</h2>
        <h3 className={styles.name}>{name}</h3>
        <h4 className={styles.course}>{course}</h4>
        <p className={styles.description}>
          Bu sertifikat imtahandan uğurla keçdiyi üçün İnnosert platforması
          tərəfindən təqdim edilmişdir.
        </p>
        <div className="flex flex-end flex-col pt-20">
          <p className={styles.date}>Tarix: {date}</p>
          <p className={styles.certNo}>Sertifikat №: {certNumber}</p>
        </div>

        <div className={styles.badge}>
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
