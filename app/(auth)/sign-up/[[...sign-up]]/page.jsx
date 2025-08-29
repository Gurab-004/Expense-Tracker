import { SignUp } from '@clerk/nextjs'
import Image from 'next/image';
export default function Page() {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 flex flex-col items-center">
          <Image
            src={"./logo.svg"}
            alt='logo'
            width={160}
            height={100}
            /><p className='mt-4'>Create Your Account</p>
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign up to start tracking your finances with Trackify
        </p>
        <SignUp />
      </div>
    </div>
  );
}