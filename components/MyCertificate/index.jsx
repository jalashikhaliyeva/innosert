import Image from "next/image";
import styles from "./Certificate.module.css";

const MyCertificate = ({ username, exam, date, seriya, percentage }) => {
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
        <div className="flex gap-7 flex-row items-center md:pt-7">
          <Image
            src="/img/innosert-logo.png"
            alt="Innosert Logo"
            width={80}
            height={20}
            className={styles.certificateLogo}
          />
          <Image
            src="/img/handex-logo.png"
            alt="Handex Logo"
            width={80}
            height={20}
            className={styles.certificateLogo}
          />
        </div>
        <h2 className={styles.title}>SERTİFİKAT</h2>
        <h3 className={styles.name}>{username}</h3>
        <hr className={styles.separator} />
        <h4 className={styles.course}>{exam}</h4>
        {/* <p className={styles.description}>
          Bu sertifikat imtahandan uğurla keçdiyi üçün İnnosert platforması
          tərəfindən təqdim edilmişdir.
        </p> */}
        <div className="flex flex-col pt-1">
          <p className={styles.date}>Tarix: {date}</p>
          <p className={styles.certNo}>Sertifikat №: {seriya}</p>
        </div>

        <div className={styles.badge}>
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default MyCertificate;
