import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div>
      <section className="bg-slate-50 lg:grid">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Manage Your Expense
              <strong className="text-indigo-600"> Control our Money </strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              start creating your budget and save a ton of money
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                href="./dashboard"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/Hero-bg.jpeg"
              alt="dashboard image"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

      </section>
    </div>
  )
}

export default Hero