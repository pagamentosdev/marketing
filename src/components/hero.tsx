import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { motion } from 'motion/react'
import {
	Highlight,
	type PrismTheme,
	type RenderProps
} from 'prism-react-renderer'
import { type CSSProperties, useEffect, useState } from 'react'
import { DictionaryPopover } from './dictionary-popover'
import { GitHub, TypeScript } from './icons'

const commands = [
	{
		label: 'npm',
		command: 'npm i pagamentos'
	},
	{
		label: 'Yarn',
		command: 'yarn add pagamentos'
	},
	{
		label: 'pnpm',
		command: 'pnpm add pagamentos'
	},
	{
		label: 'Bun',
		command: 'bun add pagamentos'
	}
]

const triggerThemeVariables = {
	'--ray-foreground': '#000000',
	'--ray-token-constant': '#5C40FF',
	'--ray-token-string': '#22A35B',
	'--ray-token-comment': '#9AA1A9',
	'--ray-token-keyword': '#B114D3',
	'--ray-token-parameter': '#000000',
	'--ray-token-function': '#5C40FF',
	'--ray-token-string-expression': '#22A35B',
	'--ray-token-punctuation': '#5B6169',
	'--ray-token-link': '#5C40FF',
	'--ray-token-number': '#1F6FEB',
	'--ray-token-property': '#000000'
} as CSSProperties

const pagamentosSnippet = [
	"import { Pagamentos, mercadopago } from 'pagamentos'",
	'',
	'const pg = new Pagamentos({',
	'  providers: [',
	'    mercadopago({ ... })',
	'  ]',
	'})',
	'',
	'const pagamento = await pg.pagamentos.create({',
	'  valor: 15000, // R$ 150,00 em centavos',
	"  metodoPagamento: 'pix',",
	'  cliente: {',
	"    nome: 'João Silva',",
	"    documento: { cpf: '12345678900' }",
	'  }',
	'})',
	'',
	'console.log(pagamento.qrcode)'
]

const pagamentosSnippetCode = pagamentosSnippet.join('\n')

const triggerTheme: PrismTheme = {
	plain: {
		color: 'var(--ray-foreground)',
		backgroundColor: 'transparent'
	},
	styles: [
		{
			types: ['comment'],
			style: { color: 'var(--ray-token-comment)' }
		},
		{
			types: ['string', 'template-string'],
			style: { color: 'var(--ray-token-string)' }
		},
		{
			types: ['number', 'boolean', 'constant'],
			style: { color: 'var(--ray-token-number)' }
		},
		{
			types: ['keyword', 'operator'],
			style: { color: 'var(--ray-token-keyword)' }
		},
		{
			types: ['function', 'class-name'],
			style: { color: 'var(--ray-token-function)' }
		},
		{
			types: ['punctuation'],
			style: { color: 'var(--ray-token-punctuation)' }
		},
		{
			types: ['property', 'attr-name'],
			style: { color: 'var(--ray-token-property)' }
		}
	]
}

export function Hero() {
	const [selectedCommand, setSelectedCommand] = useState(() => {
		const defaultCommand = commands[0]
		const preferredPackageManager = localStorage.getItem(
			'preferredPackageManager'
		)

		if (preferredPackageManager) {
			const foundCommand = commands.find(
				(cmd) =>
					cmd.label.toLowerCase() === preferredPackageManager.toLowerCase()
			)

			if (foundCommand) {
				return foundCommand
			}
		}

		return defaultCommand
	})
	const [successOnCopy, setSuccessOnCopy] = useState(false)
	const [successOnSnippetCopy, setSuccessOnSnippetCopy] = useState(false)
	const [showCheckIcon, setShowCheckIcon] = useState(false)
	const [showSnippetCheckIcon, setShowSnippetCheckIcon] = useState(false)

	useEffect(() => {
		if (successOnCopy) {
			setShowCheckIcon(true)
		} else {
			const timeout = setTimeout(() => setShowCheckIcon(false), 200)
			return () => clearTimeout(timeout)
		}
	}, [successOnCopy])

	useEffect(() => {
		if (successOnSnippetCopy) {
			setShowSnippetCheckIcon(true)
		} else {
			const timeout = setTimeout(() => setShowSnippetCheckIcon(false), 200)
			return () => clearTimeout(timeout)
		}
	}, [successOnSnippetCopy])

	function handleCopy() {
		navigator.clipboard
			.writeText(selectedCommand.command)
			.then(() => {
				setSuccessOnCopy(true)
				setTimeout(() => setSuccessOnCopy(false), 2000)
			})
			.catch(() => {
				setSuccessOnCopy(false)
			})
	}

	function handleCopySnippet() {
		navigator.clipboard
			.writeText(pagamentosSnippetCode)
			.then(() => {
				setSuccessOnSnippetCopy(true)
				setTimeout(() => setSuccessOnSnippetCopy(false), 2000)
			})
			.catch(() => {
				setSuccessOnSnippetCopy(false)
			})
	}

	function handleCommandSelect(cmd: (typeof commands)[number]) {
		setSelectedCommand(cmd)
		localStorage.setItem('preferredPackageManager', cmd.label.toLowerCase())
	}

	return (
		<div className="container mx-auto border border-t-0 border-border">
			<div className="w-full h-full py-12 px-6 sm:px-10 lg:px-20 xl:px-32 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
				<div className="w-full max-w-full lg:max-w-119 flex flex-col gap-6 lg:gap-8">
					<h1 className="font-display text-5xl/16 font-semibold">
						Uma integração, todos os pagamentos
					</h1>

					<div className="text-lg/8 inline">
						Esqueça outras documentações. Uma interface única e consistente para
						qualquer provedor, sem{' '}
						<DictionaryPopover
							trigger={<span className="italic">lock-in</span>}
							term="lock-in"
							pronunciation="/ˈlɒk ɪn/"
							definition="Dependência tecnológica onde o usuário fica preso a uma solução específica, tornando-se difícil ou custoso migrar para outra alternativa."
							example="Evite o vendor lock-in escolhendo bibliotecas open-source."
						/>
						<div className="inline italic">.</div>
					</div>

					<div className="flex gap-3">
						<a
							href="https://docs.pagamentos.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="flex px-3.5 py-2.5 items-center tracking-[-0.006em] justify-center h-10 bg-black text-white font-sans font-medium text-sm rounded-[10px] hover:bg-black/80 transition-all active:scale-95"
						>
							Ver documentação
						</a>

						<a
							href="https://github.com/pagamentosdev/pagamentos"
							target="_blank"
							rel="noopener noreferrer"
							className="flex px-3.5 relative gap-2 py-2.5 items-center tracking-[-0.006em] justify-center h-10 text-black border border-border font-sans font-medium text-sm rounded-[10px] hover:bg-gray-100 transition-all active:scale-95"
						>
							<GitHub className="size-4.5" /> GitHub
						</a>
					</div>

					<div className="flex flex-col border-border border rounded-[10px]">
						<div className="h-9 px-2.5 flex gap-4 border-b border-border">
							{commands.map((cmd) => (
								<button
									key={cmd.label}
									className="relative select-none text-xs/4 h-full tracking-[-0.006em] text-muted hover:text-text transition-colors data-[active=true]:text-text data-[active=true]:after data-[active=true]:after:block data-[active=true]:after:absolute data-[active=true]:after:-bottom-px data-[active=true]:after:left-0 data-[active=true]:after:w-full data-[active=true]:after:h-px data-[active=true]:after:bg-text"
									type="button"
									data-active={cmd.label === selectedCommand.label}
									onClick={() => handleCommandSelect(cmd)}
								>
									{cmd.label}
								</button>
							))}
						</div>

						<div className="h-10 p-2.5 font-mono text-sm/5 tracking-[-0.006em] flex justify-between group items-center">
							<span>{selectedCommand.command}</span>

							<button
								className="opacity-0 group-hover:opacity-100 data-[active=true]:opacity-100 w-6 h-6 flex items-center justify-center rounded-md border border-border hover:bg-gray-100 transition-opacity duration-200 ease-out active:scale-95"
								type="button"
								onClick={handleCopy}
								aria-label="Copiar comando para área de transferência"
								data-active={successOnCopy}
							>
								<div className="relative w-4 h-4">
									<motion.span
										className="absolute inset-0 flex items-center justify-center"
										initial={false}
										animate={{
											scale: showCheckIcon ? 1 : 0.5,
											opacity: showCheckIcon ? 1 : 0
										}}
										transition={{ duration: 0.2, ease: 'easeOut' }}
									>
										<CheckIcon className="size-4 text-green-600" />
									</motion.span>
									<motion.span
										className="absolute inset-0 flex items-center justify-center"
										initial={false}
										animate={{
											scale: showCheckIcon ? 0.5 : 1,
											opacity: showCheckIcon ? 0 : 1
										}}
										transition={{ duration: 0.2, ease: 'easeOut' }}
									>
										<ClipboardIcon className="size-4 text-muted" />
									</motion.span>
								</div>
							</button>
						</div>
					</div>
				</div>

				<div className="w-full max-w-full lg:max-w-155 h-full border border-border rounded-[10px] flex flex-col overflow-hidden">
					<div className="h-8 flex items-center justify-center px-3 text-[13px]/4 border-b border-border tracking-[-0.006em] select-none">
						<div className="flex items-center justify-center gap-1">
							<TypeScript />
							pagamentos.ts
						</div>
					</div>
					<div className="w-full lg:min-h-93">
						<div
							className="rounded-b-[10px] relative group"
							style={{
								backgroundColor: '#fafafa',
								color: 'var(--ray-foreground)',
								...triggerThemeVariables
							}}
						>
							<button
								className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-md border border-border bg-white/80 backdrop-blur opacity-0 group-hover:opacity-100 data-[active=true]:opacity-100 transition-opacity duration-200 ease-out active:scale-95"
								type="button"
								onClick={handleCopySnippet}
								aria-label="Copiar código para área de transferência"
								data-active={successOnSnippetCopy}
							>
								<div className="relative w-4 h-4">
									<motion.span
										className="absolute inset-0 flex items-center justify-center"
										initial={false}
										animate={{
											scale: showSnippetCheckIcon ? 1 : 0.5,
											opacity: showSnippetCheckIcon ? 1 : 0
										}}
										transition={{ duration: 0.2, ease: 'easeOut' }}
									>
										<CheckIcon className="size-4 text-green-600" />
									</motion.span>
									<motion.span
										className="absolute inset-0 flex items-center justify-center"
										initial={false}
										animate={{
											scale: showSnippetCheckIcon ? 0.5 : 1,
											opacity: showSnippetCheckIcon ? 0 : 1
										}}
										transition={{ duration: 0.2, ease: 'easeOut' }}
									>
										<ClipboardIcon className="size-4 text-muted" />
									</motion.span>
								</div>
							</button>
							<div
								className="px-2 pt-2 pb-2 font-mono text-[13px] leading-5 overflow-x-auto overflow-y-hidden"
								style={{
									fontFamily:
										'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
								}}
							>
								<Highlight
									code={pagamentosSnippetCode}
									language="ts"
									theme={triggerTheme}
								>
									{({
										className,
										style,
										tokens,
										getLineProps,
										getTokenProps
									}: RenderProps) => {
										const lineOccurrences = new Map<string, number>()
										const lineKeys = tokens.map((line) => {
											const text = line.map((token) => token.content).join('')
											const count = (lineOccurrences.get(text) ?? 0) + 1
											lineOccurrences.set(text, count)
											return `${text || 'blank'}-${count}`
										})

										return (
											<pre className={`${className} m-0`} style={style}>
												<div className="flex flex-col">
													{tokens.map((line, index) => {
														const tokenOccurrences = new Map<string, number>()
														const {
															className: lineClassName,
															key: _lineKey,
															...lineProps
														} = getLineProps({
															line,
															key: index
														})
														return (
															<div
																key={lineKeys[index]}
																className="flex gap-2 items-start"
															>
																<div
																	className="h-5 w-6 shrink-0 select-none tabular-nums text-right pr-1"
																	style={{ color: 'var(--ray-token-comment)' }}
																>
																	{index + 1}
																</div>
																<div
																	className={`${lineClassName ?? ''} h-5 min-w-0 whitespace-pre`}
																	{...lineProps}
																>
																	{line.map((token, key) => {
																		const tokenKeyBase =
																			token.content || 'token'
																		const count =
																			(tokenOccurrences.get(tokenKeyBase) ??
																				0) + 1
																		tokenOccurrences.set(tokenKeyBase, count)
																		const tokenProps = getTokenProps({
																			token,
																			key
																		})
																		const {
																			key: _tokenKey,
																			...restTokenProps
																		} = tokenProps
																		return (
																			<span
																				key={`${tokenKeyBase}-${count}`}
																				{...restTokenProps}
																			/>
																		)
																	})}
																</div>
															</div>
														)
													})}
												</div>
											</pre>
										)
									}}
								</Highlight>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
