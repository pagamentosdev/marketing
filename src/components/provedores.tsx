import { providers } from "../data/providers";

export function Provedores() {
  const minItemsPerSet = 12;
  const repeatCount = Math.ceil(minItemsPerSet / providers.length);
  const marqueeProviders = Array.from(
    { length: repeatCount },
    () => providers,
  ).flat();

  return (
    <div className="flex flex-col border border-t-0 border-border container mx-auto">
      <div className="flex items-start px-8 py-5 text-lg/6 tracking-[-0.006em] border-b border-border">
        Conheça todos os provedores suportados:
      </div>

      <div className="w-full overflow-hidden h-24">
        <div className="marquee-track flex items-center h-full hover:pause-animation">
          {/* First set */}
          <div className="marquee-content flex items-center shrink-0 justify-around gap-8 px-6">
            {marqueeProviders.map((provider, index) => (
              <a
                key={`${provider.id}-${index}`}
                href={`/provedores/${provider.id}`}
                className="cursor-pointer transition-opacity hover:opacity-70 shrink-0"
              >
                <provider.icon className="h-8 w-auto" />
              </a>
            ))}
          </div>
          {/* Second set - duplicate for seamless loop */}
          <div
            className="marquee-content flex items-center shrink-0 justify-around gap-8 px-6"
            aria-hidden="true"
          >
            {marqueeProviders.map((provider, index) => (
              <a
                key={`${provider.id}-${index}-dup`}
                href={`/provedores/${provider.id}`}
                className="cursor-pointer transition-opacity hover:opacity-70 shrink-0"
              >
                <provider.icon className="h-8 w-auto" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
