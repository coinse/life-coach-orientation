'use client'

import { type TouchEvent, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const variant = process.env.NEXT_PUBLIC_HOME_ACTION_VARIANT ?? process.env.HOME_ACTION_VARIANT ?? 'intervention'

const chatbotCards = Array.from({ length: 14 }, (_, index) => ({
  src: `/images/manual_cards_chatbot/${index + 1}.png`,
  alt: `챗봇 사용 설명 카드 ${index + 1}`
}))

const themeBrowserCards = Array.from({ length: 7 }, (_, index) => ({
  src: `/images/manual_cards_theme_browser/${index + 1}.png`,
  alt: `주제문 읽기 도구 사용 설명 카드 ${index + 1}`
}))

type ManualCardSliderProps = {
  cards: Array<{ src: string; alt: string }>
  title: string
  description: string
}

function ManualCardSlider({ cards, title, description }: ManualCardSliderProps) {
  const [currentCard, setCurrentCard] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const programmaticScrollTargetRef = useRef<number | null>(null)
  const touchStartRef = useRef<{ x: number; y: number; card: number } | null>(null)

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current
    if (!slider) return

    const nextIndex = Math.max(0, Math.min(index, cards.length - 1))
    const cardWidth = slider.clientWidth

    programmaticScrollTargetRef.current = nextIndex
    setCurrentCard(nextIndex)
    slider.scrollTo({
      left: cardWidth * nextIndex,
      behavior: 'smooth'
    })
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    if (!touch) return

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      card: currentCard
    }
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const touchStart = touchStartRef.current
    const touch = event.touches[0]
    if (!touchStart || !touch) return

    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      event.preventDefault()
    }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchStart = touchStartRef.current
    const touch = event.changedTouches[0]
    touchStartRef.current = null

    if (!touchStart || !touch) return

    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
      scrollToCard(touchStart.card)
      return
    }

    scrollToCard(touchStart.card + (deltaX < 0 ? 1 : -1))
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      const programmaticScrollTarget = programmaticScrollTargetRef.current
      if (programmaticScrollTarget !== null) {
        const targetScrollLeft = slider.clientWidth * programmaticScrollTarget

        if (Math.abs(slider.scrollLeft - targetScrollLeft) < 2) {
          programmaticScrollTargetRef.current = null
        }

        return
      }

      const nextIndex = Math.round(slider.scrollLeft / slider.clientWidth)
      setCurrentCard(Math.max(0, Math.min(nextIndex, cards.length - 1)))
    }

    slider.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      slider.removeEventListener('scroll', handleScroll)
    }
  }, [cards.length])

  useEffect(() => {
    const handleResize = () => {
      scrollToCard(currentCard)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [currentCard])

  return (
    <div className="flex w-full max-w-[720px] flex-col gap-2">
      <div className="space-y-1">
        <p className="text-md font-medium text-neutral-700">{title}</p>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-neutral-500">{description}</p>
          <p className="shrink-0 pt-0.5 text-sm font-medium leading-none text-neutral-500">
            {currentCard + 1} / {cards.length}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null
          }}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl border border-neutral-200 bg-neutral-50 scrollbar-none"
          style={{ scrollbarWidth: 'none', touchAction: 'pan-y' }}
        >
          {cards.map((card) => (
            <div key={card.src} className="w-full shrink-0 snap-center">
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToCard(currentCard - 1)}
          disabled={currentCard === 0}
          className="absolute inset-y-0 left-0 flex w-20 cursor-pointer items-center justify-start rounded-l-xl bg-transparent pl-3 text-neutral-700 transition disabled:cursor-not-allowed disabled:opacity-30 sm:bg-gradient-to-r sm:from-white/95 sm:via-white/65 sm:to-transparent sm:hover:from-white"
          aria-label={`${title} 이전 카드 보기`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/95 shadow-sm">
            <ChevronLeft className="h-5 w-5" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => scrollToCard(currentCard + 1)}
          disabled={currentCard === cards.length - 1}
          className="absolute inset-y-0 right-0 flex w-20 cursor-pointer items-center justify-end rounded-r-xl bg-transparent pr-3 text-neutral-700 transition disabled:cursor-not-allowed disabled:opacity-30 sm:bg-gradient-to-l sm:from-white/95 sm:via-white/65 sm:to-transparent sm:hover:from-white"
          aria-label={`${title} 다음 카드 보기`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/95 shadow-sm">
            <ChevronRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  )
}

export function OrientationContent() {
  const orientationLink =
    variant === 'sham'
      ? 'https://greenmon.notion.site/34994abf6b9580ff8173f70f243cc276?source=copy_link'
      : 'https://greenmon.notion.site/34994abf6b95803c95ffebda1e36d37a?source=copy_link'

  const videoSrc =
    variant === 'sham'
      ? 'https://www.youtube.com/embed/pK3cnKzm0Go'
      : 'https://www.youtube.com/embed/T_yPIJ7TjKU'

  const activeManual =
    variant === 'sham'
      ? {
          cards: themeBrowserCards,
          title: '✅ 주제문 읽기 도구 사용안내서',
          description: '주제문 읽기 도구 사용 방법을 안내드리는 카드입니다. 옆으로 넘기면서 확인하실 수 있습니다.'
        }
      : {
          cards: chatbotCards,
          title: '✅ 챗봇 도구 사용안내서',
          description: '매 회기 챗봇 도구 사용 방법을 안내드리는 카드입니다. 옆으로 넘기면서 확인하실 수 있습니다.'
        }

  return (
    <div className="mt-5 flex flex-col gap-4">
      
      <div className="flex w-full max-w-[720px] flex-col gap-2">
        <div className="space-y-1">
          <p className="text-md font-medium text-neutral-700">✅ 연구 절차 설명 (5분)</p>
          <p className="text-sm text-neutral-500">
            전체적인 연구 절차와 챗봇 도구의 사용 방법을 영상으로 안내드립니다. 중요한 안내사항이 포함되어 있으니 꼭 시청 부탁드립니다.
          </p>
        </div>
        <div className="aspect-video w-full overflow-hidden">
          <iframe
            className="h-full w-full"
            src={videoSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      <div className="space-y-1 mb-5">
        <a
          href={orientationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 visited:text-purple-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          🔗 동영상 속 안내문 보기
        </a>
      </div>

      <ManualCardSlider
        cards={activeManual.cards}
        title={activeManual.title}
        description={activeManual.description}
      />

    </div>
  )
}
