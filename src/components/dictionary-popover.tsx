import { Popover } from '@base-ui-components/react/popover'
import type { ReactNode } from 'react'

interface DictionaryPopoverProps {
  trigger: ReactNode
  term: string
  pronunciation?: string
  definition: string
  example?: string
}

export function DictionaryPopover({
  trigger,
  term,
  pronunciation,
  definition,
  example
}: DictionaryPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className="inline cursor-help underline decoration-dotted underline-offset-4">
        {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="center" side="top" sideOffset={8}>
          <Popover.Popup className="z-50 max-w-xs rounded-[10px] border border-border bg-white shadow-lg transition-all duration-200 ease-out focus:outline-none data-[state=closed]:translate-y-2 data-[state=open]:translate-y-0 data-[state=closed]:scale-95 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
            <div className="p-4">
              <div className="mb-1 flex items-baseline gap-2">
                <Popover.Title className="font-semibold text-black text-lg">
                  {term || 'Definition'}
                </Popover.Title>
                {pronunciation && (
                  <span className="font-medium text-muted text-sm">
                    {pronunciation}
                  </span>
                )}
              </div>
              <Popover.Description className="text-sm text-text leading-relaxed">
                {definition}
              </Popover.Description>
              {example && (
                <p className="mt-2 text-muted text-sm italic">"{example}"</p>
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
