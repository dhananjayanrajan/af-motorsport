'use client'

import { cn } from '@/utilities/cn'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F0F0F0] p-6 text-black">
      {/* Heavy Border Container */}
      <div className="w-full max-w-2xl border-[6px] border-black bg-white p-10 md:p-20 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">

        {/* Header Section */}
        <div className="border-b-[6px] border-black pb-6 mb-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Error
          </h2>
        </div>

        {/* Message Section */}
        <div className="space-y-8">
          <p className="text-xl md:text-2xl font-bold uppercase leading-none">
            Something went wrong on our end.
          </p>

          <p className="text-lg font-bold border-l-[6px] border-black pl-6">
            The page failed to load correctly. You can try to refresh the connection using the button below.
          </p>
        </div>

        {/* Brutalist Button */}
        <button
          className={cn(
            "mt-12 flex w-full md:w-max px-16 h-20 items-center justify-center transition-all",
            "bg-black text-white hover:bg-white hover:text-black border-[4px] border-black",
            "active:translate-x-2 active:translate-y-2 active:shadow-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          )}
          onClick={() => reset()}
          type="button"
        >
          <span className="text-xl font-black uppercase tracking-widest">
            Restart
          </span>
        </button>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-10 right-10 opacity-10 select-none pointer-events-none hidden md:block">
        <span className="text-[200px] font-black italic">!</span>
      </div>
    </div>
  )
}