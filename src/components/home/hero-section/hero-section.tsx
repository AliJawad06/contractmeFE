export function HeroSection() {
  return (
    <section className={'mx-auto max-w-7xl px-[32px] relative flex items-center justify-between mt-16 mb-12'}>
      <div className={'text-center w-full'}>
        <div className={'hero-container mx-auto max-w-4xl'}>
          <h1
            className={
              'text-[48px] leading-[52px] md:text-[72px] md:leading-[76px] tracking-[-1.6px] font-semibold bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent'
            }
          >
            Find Your Next
            <br />
            Contract Job
          </h1>
          <p
            className={
              'mt-8 text-[18px] leading-[28px] md:text-[20px] md:leading-[32px] text-muted-foreground max-w-2xl mx-auto'
            }
          >
            Contractly is your one stop shop to find your next contract jobs. We search through hundreds of sites for
            you.
          </p>
          <div className={'mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto'}>
            <div className={'card-3d p-4 text-left'}>
              <div className={'text-sm font-medium text-purple-300'}>Unlimited Alerts</div>
              <div className={'text-xs text-muted-foreground mt-1'}>Never miss an opportunity</div>
            </div>
            <div className={'card-3d p-4 text-left'}>
              <div className={'text-sm font-medium text-purple-300'}>5 Auto-Applications/Day</div>
              <div className={'text-xs text-muted-foreground mt-1'}>Save hours of manual work</div>
            </div>
            <div className={'card-3d p-4 text-left'}>
              <div className={'text-sm font-medium text-purple-300'}>Recruiter Access</div>
              <div className={'text-xs text-muted-foreground mt-1'}>Direct contact information</div>
            </div>
            <div className={'card-3d p-4 text-left'}>
              <div className={'text-sm font-medium text-purple-300'}>Early Access Features</div>
              <div className={'text-xs text-muted-foreground mt-1'}>Be first to try new tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
