import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import {
  buildProjectGuideHref,
  buildProjectGuideMessage,
  getProjectGuidePath,
  getProjectGuideSituation,
  projectGuidePaths,
  resolveProjectGuideSelection,
} from '../data/projectGuide.js'

const initialSelections = { needId: null, situationId: null, goalId: null }
const previousSteps = { situation: 'need', goal: 'situation', summary: 'goal' }

export default function ProjectGuide() {
  const [selections, setSelections] = useState(initialSelections)
  const [step, setStep] = useState('need')
  const [direction, setDirection] = useState('forward')
  const [isLeaving, setIsLeaving] = useState(false)
  const headingRef = useRef(null)
  const advanceTimerRef = useRef(null)
  const leaveTimerRef = useRef(null)
  const shouldFocusHeadingRef = useRef(false)

  const path = getProjectGuidePath(selections.needId)
  const situation = getProjectGuideSituation(path, selections.situationId)
  const stepConfig =
    step === 'summary'
      ? null
      : {
          need: {
            count: 1,
            heading: 'Por onde podemos começar?',
            options: projectGuidePaths,
            field: 'needId',
            next: 'situation',
          },
          situation: {
            count: 2,
            heading: path?.situationPrompt ?? 'Como está a situação hoje?',
            options: path?.situations ?? [],
            field: 'situationId',
            next: 'goal',
          },
          goal: {
            count: 3,
            heading: situation?.goalPrompt ?? 'O que você espera alcançar?',
            options: situation?.goals ?? [],
            field: 'goalId',
            next: 'summary',
          },
        }[step]

  const progressValue = step === 'summary' ? 3 : stepConfig.count
  const announcement =
    step === 'summary'
      ? 'Escolhas concluídas. Revise a mensagem antes de abrir o WhatsApp.'
      : `${stepConfig.heading}. Escolha ${stepConfig.count} de 3.`

  useEffect(
    () => () => {
      window.clearTimeout(advanceTimerRef.current)
      window.clearTimeout(leaveTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    if (!shouldFocusHeadingRef.current) return
    headingRef.current?.focus()
    shouldFocusHeadingRef.current = false
  }, [step])

  const moveToStep = (nextStep, nextDirection) => {
    shouldFocusHeadingRef.current = true
    setIsLeaving(false)
    setDirection(nextDirection)
    setStep(nextStep)
  }

  const choose = (field, id, nextStep) => {
    window.clearTimeout(advanceTimerRef.current)
    window.clearTimeout(leaveTimerRef.current)
    setIsLeaving(false)
    setSelections((current) => ({
      ...current,
      [field]: id,
      ...(field === 'needId' ? { situationId: null, goalId: null } : {}),
      ...(field === 'situationId' ? { goalId: null } : {}),
    }))

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      moveToStep(nextStep, 'forward')
      return
    }

    leaveTimerRef.current = window.setTimeout(() => setIsLeaving(true), 160)
    advanceTimerRef.current = window.setTimeout(() => moveToStep(nextStep, 'forward'), reduceMotion ? 0 : 260)
  }

  const goBack = () => {
    window.clearTimeout(advanceTimerRef.current)
    window.clearTimeout(leaveTimerRef.current)
    moveToStep(previousSteps[step] ?? 'need', 'backward')
  }

  const restart = () => {
    window.clearTimeout(advanceTimerRef.current)
    window.clearTimeout(leaveTimerRef.current)
    setSelections(initialSelections)
    moveToStep('need', 'backward')
  }

  const resolved = step === 'summary' ? resolveProjectGuideSelection(selections) : null
  const message = step === 'summary' ? buildProjectGuideMessage(selections) : null
  const whatsappHref = step === 'summary' ? buildProjectGuideHref(selections) : null

  return (
    <section className="project-guide section-pad" id="guia-projeto" aria-labelledby="project-guide-title">
      <div className="container">
        <div className="project-guide-heading" data-reveal>
          <p className="section-label">
            <span>GUIA</span> ESCOLHAS RÁPIDAS
          </p>
          <h2 id="project-guide-title">O que você precisa resolver?</h2>
          <p>Três escolhas ajudam a organizar seu contexto antes da conversa.</p>
        </div>

        <div className="project-guide-panel reveal-delay-1" data-reveal>
          <div className="project-guide-progress-row">
            <p className="project-guide-count">
              {step === 'summary' ? 'Escolhas concluídas' : `Escolha ${progressValue} de 3`}
            </p>
            <div
              className="project-guide-progress"
              role="progressbar"
              aria-label="Progresso do guia"
              aria-valuemin="1"
              aria-valuemax="3"
              aria-valuenow={progressValue}
            >
              <span style={{ '--project-guide-progress': progressValue / 3 }} />
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>

          <div className={`project-guide-step direction-${direction}${isLeaving ? ' is-leaving' : ''}`} key={step}>
            {stepConfig ? (
              <>
                <h3 ref={headingRef} tabIndex="-1">
                  {stepConfig.heading}
                </h3>
                <div className="project-guide-options">
                  {stepConfig.options.map((option) => {
                    const isSelected = selections[stepConfig.field] === option.id
                    return (
                      <button
                        type="button"
                        className={`project-guide-choice${isSelected ? ' is-selected' : ''}`}
                        aria-pressed={isSelected}
                        key={option.id}
                        onClick={() => choose(stepConfig.field, option.id, stepConfig.next)}
                      >
                        <span>{option.label}</span>
                        <Icon name={isSelected ? 'check' : 'arrow'} size={17} />
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="project-guide-summary">
                <h3 ref={headingRef} tabIndex="-1">
                  Já temos um bom ponto de partida.
                </h3>
                {resolved && message && whatsappHref ? (
                  <>
                    <p className="project-guide-summary-note">
                      Revise as informações antes de continuar. Você poderá complementar ou alterar a mensagem no
                      WhatsApp.
                    </p>
                    <div className="project-guide-tags" aria-label="Resumo das escolhas">
                      <span>{resolved.path.label}</span>
                      <span>{resolved.situation.label}</span>
                      <span>{resolved.goal.label}</span>
                    </div>
                    <blockquote>{message}</blockquote>
                    <a className="button project-guide-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
                      <span>Continuar no WhatsApp</span> <Icon name="external" size={18} />
                    </a>
                  </>
                ) : (
                  <p>Não foi possível montar a mensagem. Recomece para revisar suas escolhas.</p>
                )}
              </div>
            )}
          </div>

          <div className="project-guide-actions">
            {step !== 'need' && (
              <button type="button" className="project-guide-secondary" onClick={goBack}>
                Voltar
              </button>
            )}
            {step !== 'need' && (
              <button type="button" className="project-guide-secondary" onClick={restart}>
                Recomeçar
              </button>
            )}
            <a className="text-link project-guide-skip" href="#solucoes">
              Prefiro explorar as soluções <Icon name="down" size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
