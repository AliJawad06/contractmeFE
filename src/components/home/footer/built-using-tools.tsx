export function BuiltUsingTools() {
  return (
    <div className={'mx-auto max-w-7xl text-center px-8 mt-24 mb-24'}>
      <div className={'container-3d p-8 max-w-2xl mx-auto'}>
        <h3 className={'text-xl font-semibold mb-4'}>Why Contractly?</h3>
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-6 text-left'}>
          <div>
            <div className={'text-2xl font-bold text-purple-400'}>100+</div>
            <div className={'text-sm text-muted-foreground'}>Job sites searched daily</div>
          </div>
          <div>
            <div className={'text-2xl font-bold text-purple-400'}>1000s</div>
            <div className={'text-sm text-muted-foreground'}>New contracts found weekly</div>
          </div>
          <div>
            <div className={'text-2xl font-bold text-purple-400'}>24/7</div>
            <div className={'text-sm text-muted-foreground'}>Automated job monitoring</div>
          </div>
        </div>
      </div>
    </div>
  );
}
