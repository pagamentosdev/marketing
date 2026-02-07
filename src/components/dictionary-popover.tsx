import { Popover } from '@base-ui/react/popover'
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
			<Popover.Trigger
				className="cursor-help underline decoration-dotted underline-offset-4 inline"
				openOnHover
				delay={150}
				closeDelay={100}
			>
				{trigger}
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Positioner side="top" sideOffset={8} align="center">
					<Popover.Popup className="z-50 max-w-xs bg-white border border-border rounded-[10px] shadow-lg focus:outline-none transition-all duration-200 ease-out data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=closed]:translate-y-2">
						<div className="p-4">
							<div className="flex items-baseline gap-2 mb-1">
								<Popover.Title className="text-lg font-semibold text-black">
									{term || 'Definition'}
								</Popover.Title>
								{pronunciation && (
									<span className="text-sm text-muted font-medium">
										{pronunciation}
									</span>
								)}
							</div>
							<Popover.Description className="text-sm text-text leading-relaxed">
								{definition}
							</Popover.Description>
							{example && (
								<p className="mt-2 text-sm text-muted italic">"{example}"</p>
							)}
						</div>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	)
}
