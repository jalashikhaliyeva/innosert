import { useRouter } from "next/router";
import Link from "next/link";

// Helper function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BreadcrumbHome = () => {
  const router = useRouter();
  const { query } = router;

  // Get the path segments from the asPath instead of pathname
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  // Use the correct query parameter based on your dynamic route
  const lastSegment = query.slug || pathSegments[pathSegments.length - 1];

  return (
    <div className="flex flex-row gap-3 mt-24 md:mt-32 mb-7">
      {/* Static home link */}
      <Link href="/home">
        <span className="text-sm font-gilroy md:text-base font-normal leading-6 text-grayText cursor-pointer hover:text-textSecondaryDefault transition-colors duration-300 ease-in-out">
          Əsas səhifə
        </span>
      </Link>

      {lastSegment && (
        <>
          <span className="font-gilroy text-xs md:text-base font-normal leading-6 text-grayText mx-2">
            /
          </span>
          <span className="font-gilroy text-xs md:text-base font-normal leading-6 text-textSecondaryDefault">
            {capitalizeWords(lastSegment.replace(/-/g, " "))}
            {/* Replace dashes and capitalize */}
          </span>
        </>
      )}
    </div>
  );
};

export default BreadcrumbHome;
