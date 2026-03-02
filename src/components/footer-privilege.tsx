
export const FooterPrivilege = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-black dark:text-white py-20 px-8 border-t border-gray-100 dark:border-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <h2 className="text-7xl font-light tracking-tighter mb-4">
            A Privilege.
          </h2>
          <div className="mt-16 flex items-center gap-4">
            <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center rounded-sm">
              <div className="w-6 h-6 border-2 border-white dark:border-zinc-950 rotate-45"></div>
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              Layouts Equity
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-7xl font-light tracking-tighter text-gray-400 dark:text-zinc-700">
            Beyond Reach.
          </h2>
          <p className="max-w-md text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
            Layouts always open to the world, and it was never meant to be.
            Those inside live the results. Those outside will only see the
            shadows.
          </p>
          <button className="px-8 cursor-pointer relative py-3 bg-gray-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            Contact us
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400 dark:text-zinc-600">
        <p>© 2025 LAYOUTS EQUITY</p>
        <p>ALL RIGHTS RESERVED</p>
        <a href="https://x.com/naymur_dev" target="_blank">
          MADE BY{' '}
          <span className="text-black dark:text-zinc-300 underline underline-offset-4 cursor-pointer">
            NAYMUR
          </span>
        </a>
      </div>
    </footer>
  )
}
