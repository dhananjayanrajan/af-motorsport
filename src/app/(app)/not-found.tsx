import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full py-32 flex flex-col items-center justify-center text-center bg-zinc-100 min-h-[70vh]">
      <div className="relative mb-12">
        <h1 className="text-9xl font-bold leading-none tracking-tighter text-black opacity-10">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="size-4 bg-error animate-pulse border-2 border-black" />
          <span className="text-2xl font-bold uppercase tracking-tighter text-black">
            Page Not Found
          </span>
        </div>
      </div>

      <div className="max-w-md mb-16 px-6">
        <div className="border-l-4 border-black pl-6 py-2">
          <p className="text-sm font-bold uppercase tracking-tight text-black text-left leading-tight">
            The requested page does not exist. The resource may have been moved or deleted from the server.
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="group relative flex items-center justify-center px-10 h-16 bg-black text-white transition-all hover:bg-primary hover:text-black border-2 border-black"
      >
        <span className="relative z-10 text-xs font-bold uppercase tracking-widest">
          Return to Home
        </span>
      </Link>

      <div className="mt-20 flex gap-4">
        <div className="size-2 bg-black opacity-20" />
        <div className="size-2 bg-black opacity-40" />
        <div className="size-2 bg-black opacity-60" />
      </div>
    </div>
  )
}