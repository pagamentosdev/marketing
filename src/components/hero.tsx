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
  const [selectedCommand, setSelectedCommand] = useState(commands[0])

  useEffect(() => {
    const preferredPackageManager = localStorage.getItem(
      'preferredPackageManager'
    )

    if (preferredPackageManager) {
      const foundCommand = commands.find(
        (cmd) =>
          cmd.label.toLowerCase() === preferredPackageManager.toLowerCase()
      )

      if (foundCommand) {
        setSelectedCommand(foundCommand)
      }
    }
  }, [])
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
    <div className="container mx-auto border border-border border-t-0">
      <div className="flex h-full w-full flex-col items-center justify-between gap-10 px-6 py-12 sm:px-10 lg:flex-row lg:gap-16 lg:px-20 xl:px-32">
        <div className="flex w-full max-w-full flex-col gap-6 lg:max-w-119 lg:gap-8">
          <h1 className="font-display font-semibold text-5xl/16">
            Uma integração, todos os pagamentos
          </h1>

          <div className="inline text-lg/8">
            Esqueça outras documentações. Uma interface única e consistente para
            qualquer provedor, sem{' '}
            <DictionaryPopover
              definition="Dependência tecnológica onde o usuário fica preso a uma solução específica, tornando-se difícil ou custoso migrar para outra alternativa."
              example="Evite o vendor lock-in escolhendo bibliotecas open-source."
              pronunciation="/ˈlɒk ɪn/"
              term="lock-in"
              trigger={<span className="italic">lock-in</span>}
            />
            <div className="inline italic">.</div>
          </div>

          <div className="flex gap-3">
            <a
              className="flex h-10 items-center justify-center rounded-[10px] bg-black px-3.5 py-2.5 font-medium font-sans text-sm text-white tracking-[-0.006em] transition-all hover:bg-black/80 active:scale-95"
              href="https://docs.pagamentos.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver documentação
            </a>

            <a
              className="relative flex h-10 items-center justify-center gap-2 rounded-[10px] border border-border px-3.5 py-2.5 font-medium font-sans text-black text-sm tracking-[-0.006em] transition-all hover:bg-gray-100 active:scale-95"
              href="https://github.com/pagamentosdev/pagamentos"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHub className="size-4.5" /> GitHub
            </a>
          </div>

          <div className="flex flex-col rounded-[10px] border border-border">
            <div className="flex h-9 gap-4 border-border border-b px-2.5">
              {commands.map((cmd) => (
                <button
                  className="data-[active=true]:after relative h-full select-none text-muted text-xs/4 tracking-[-0.006em] transition-colors hover:text-text data-[active=true]:text-text data-[active=true]:after:absolute data-[active=true]:after:-bottom-px data-[active=true]:after:left-0 data-[active=true]:after:block data-[active=true]:after:h-px data-[active=true]:after:w-full data-[active=true]:after:bg-text"
                  data-active={cmd.label === selectedCommand.label}
                  key={cmd.label}
                  onClick={() => handleCommandSelect(cmd)}
                  type="button"
                >
                  {cmd.label}
                </button>
              ))}
            </div>

            <div className="group flex h-10 items-center justify-between p-2.5 font-mono text-sm/5 tracking-[-0.006em]">
              <span>{selectedCommand.command}</span>

              <button
                aria-label="Copiar comando para área de transferência"
                className="flex h-6 w-6 items-center justify-center rounded-md border border-border opacity-0 transition-opacity duration-200 ease-out hover:bg-gray-100 active:scale-95 group-hover:opacity-100 data-[active=true]:opacity-100"
                data-active={successOnCopy}
                onClick={handleCopy}
                type="button"
              >
                <div className="relative h-4 w-4">
                  <motion.span
                    animate={{
                      scale: showCheckIcon ? 1 : 0.5,
                      opacity: showCheckIcon ? 1 : 0
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <CheckIcon className="size-4 text-green-600" />
                  </motion.span>
                  <motion.span
                    animate={{
                      scale: showCheckIcon ? 0.5 : 1,
                      opacity: showCheckIcon ? 0 : 1
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <ClipboardIcon className="size-4 text-muted" />
                  </motion.span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-full w-full max-w-full flex-col overflow-hidden rounded-[10px] border border-border lg:max-w-155">
          <div className="flex h-8 select-none items-center justify-center border-border border-b px-3 text-[13px]/4 tracking-[-0.006em]">
            <div className="flex items-center justify-center gap-1">
              <TypeScript />
              pagamentos.ts
            </div>
          </div>
          <div className="w-full lg:min-h-93">
            <div
              className="group relative rounded-b-[10px]"
              style={{
                backgroundColor: '#fafafa',
                color: 'var(--ray-foreground)',
                ...triggerThemeVariables
              }}
            >
              <button
                aria-label="Copiar código para área de transferência"
                className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-md border border-border bg-white/80 opacity-0 backdrop-blur transition-opacity duration-200 ease-out active:scale-95 group-hover:opacity-100 data-[active=true]:opacity-100"
                data-active={successOnSnippetCopy}
                onClick={handleCopySnippet}
                type="button"
              >
                <div className="relative h-4 w-4">
                  <motion.span
                    animate={{
                      scale: showSnippetCheckIcon ? 1 : 0.5,
                      opacity: showSnippetCheckIcon ? 1 : 0
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <CheckIcon className="size-4 text-green-600" />
                  </motion.span>
                  <motion.span
                    animate={{
                      scale: showSnippetCheckIcon ? 0.5 : 1,
                      opacity: showSnippetCheckIcon ? 0 : 1
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <ClipboardIcon className="size-4 text-muted" />
                  </motion.span>
                </div>
              </button>
              <div
                className="overflow-x-auto overflow-y-hidden px-2 pt-2 pb-2 font-mono text-[13px] leading-5"
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
                                className="flex items-start gap-2"
                                key={lineKeys[index]}
                              >
                                <div
                                  className="h-5 w-6 shrink-0 select-none pr-1 text-right tabular-nums"
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
