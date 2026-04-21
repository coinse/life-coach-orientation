const variant = process.env.NEXT_PUBLIC_HOME_ACTION_VARIANT ?? process.env.HOME_ACTION_VARIANT ?? 'intervention'

export function OrientationContent() {
  const orientationLink =
    variant === 'sham'
      ? 'https://www.notion.so/greenmon/34994abf6b9580ff8173f70f243cc276?source=copy_link'
      : 'https://www.notion.so/greenmon/34994abf6b95803c95ffebda1e36d37a?source=copy_link'


  const videoSrc = 
    variant === 'sham'
      ? 'https://www.youtube.com/embed/pK3cnKzm0Go'
      : 'https://www.youtube.com/embed/T_yPIJ7TjKU'
  return (
    <div className="flex flex-col gap-4 mt-5">
      <iframe
        width="720" 
        height="405" 
        src={videoSrc} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen>
      </iframe>
      <a
        href={orientationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline underline-offset-2 visited:text-purple-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        🔗 안내문 보기
      </a>
    </div>
  )
}
