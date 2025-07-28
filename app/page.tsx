import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen bg-[#FDFDFD] overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-6 left-6 z-20">
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
      </div>

      {/* Login Button */}
      <div className="absolute top-6 right-10 z-20">
        <Link href="/login">
          <button className="px-6 py-2 rounded-md bg-[#4C1D95] text-white font-semibold shadow-md">
            Login
          </button>
        </Link>
      </div>

      {/* Value Proposition */}
      <div className="flex flex-col items-center justify-center text-center mt-28 z-20 relative px-6 ">
        <p className="text-sm text-[#9A4EF1] font-semibold">CoralPay</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2">
          Headline that highlights the <br /> Value Proposition
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl">
          Describe exactly what your product or service does and how it makes
          your customer’s lives better. Avoid using verbose words or phrases.
        </p>
      </div>

      {/* Background Illustration */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/landing-background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>

      {/* Dashboard Image */}
      <div className="flex justify-center mt-20 relative z-10">
        <Image
          src="/images/dashboardImage.png"
          alt="Dashboard"
          width={1000}
          height={600}
          className="rounded-xl shadow-lg border"
        />
      </div>
    </div>
  );
}
