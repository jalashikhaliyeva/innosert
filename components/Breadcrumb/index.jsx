import { useRouter } from "next/router";
import Link from "next/link";

const Breadcrumb = () => {
  const router = useRouter();

  // Use asPath to get the actual path with dynamic segments
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment)
    .map((segment) => decodeURIComponent(segment)); // Decode URL components

  // Mapping of paths to breadcrumb names
  const breadcrumbMapping = {
    home: "Əsas səhifə",
    profil: "Profil",
    fayllar: "Fayllar",
    backend: "Backend",
    english: "English",
    neticelerim: "Nəticələrim",
    imtahanlarim: "İmtahanlarım",
    sertifikatlarim: "Sertifikatlarım",
    balansim: "Balansım",
    hesablarim: "Hesablarım",
    "suallar-toplusu": "Sual Toplusu",
    "xeta-bildirisleri": "Xəta bildirişləri",
    uzvler: "Üzvlər",
    "uzv-aktivliyi": "Üzv aktivliyi",
    "sual-bazasi":"Sual bazası",
    "umumi-imtahanlar": "İmtahanlar",
    "imtahan-detallari": "İmtahan detalları"
    // Add more mappings as needed
  };

  // Function to format labels if not in mapping
  const formatLabel = (segment) => {
    // Replace hyphens with spaces and capitalize first letter of each word
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Construct dynamic breadcrumb items from the URL segments
  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Skip 'home' and 'profil' as they are handled statically
    if (segment === "home" || segment === "profil") return null;

    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = breadcrumbMapping[segment] || formatLabel(segment);
    const isLast = index === pathSegments.length - 1;

    return (
      <div key={path} className="flex items-center">
        <span className="font-gilroy text-base font-normal leading-6 text-grayText mx-2">
          /
        </span>
        {isLast ? (
          // Render the last segment as plain text with active styling
          <span className="font-gilroy text-base font-normal leading-6 text-textSecondaryDefault">
            {label}
          </span>
        ) : (
          // Render other segments as links with default styling
          <Link href={path}>
            <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
              {label}
            </span>
          </Link>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-row gap-3 mt-32 mb-6">
      {/* Static home link */}
      <Link href="/home">
        <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
          Əsas səhifə
        </span>
      </Link>
      <span className="font-gilroy text-base font-normal leading-6 text-grayText mx-2">
        /
      </span>

      {/* Static profil link */}
      <Link href="/profil">
        <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
          Profil
        </span>
      </Link>

      {/* Render dynamic breadcrumb items */}
      {breadcrumbItems}
    </div>
  );
};

export default Breadcrumb;
