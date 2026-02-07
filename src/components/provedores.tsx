import { providers } from '../data/providers'

export function Provedores() {
  const minItemsPerSet = 12
  const repeatCount = Math.ceil(minItemsPerSet / providers.length)
  const marqueeProviders = Array.from(
    { length: repeatCount },
    () => providers
  ).flat()

  return (
    <div className="container mx-auto flex flex-col border border-border border-t-0">
      <div className="flex items-start border-border border-b px-8 py-5 text-lg/6 tracking-[-0.006em]">
        Conheça todos os provedores suportados:
      </div>

      <div className="h-24 w-full overflow-hidden">
        <div className="marquee-track hover:pause-animation flex h-full items-center">
          {/* First set */}
          <div className="marquee-content flex shrink-0 items-center justify-around gap-8 px-6">
            {marqueeProviders.map((provider, index) => (
              <a
                className="shrink-0 cursor-pointer transition-opacity hover:opacity-70"
                href={`/provedores/${provider.id}`}
                key={`${provider.id}-${index}`}
              >
                <provider.icon className="h-8 w-auto" />
              </a>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="marquee-content flex shrink-0 items-center justify-around gap-8 px-6"
          >
            {marqueeProviders.map((provider, index) => (
              <a
                className="shrink-0 cursor-pointer transition-opacity hover:opacity-70"
                href={`/provedores/${provider.id}`}
                key={`${provider.id}-${index}-dup`}
              >
                <provider.icon className="h-8 w-auto" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
