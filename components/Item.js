import Image from './Image'
import Link from 'next/link'
import { Prefetch } from '@layer0/react'

const Item = ({ id, name, image }) => {
  let prefetchProps = {}
  if (process.browser) {
    prefetchProps.url = `/_next/data/${__NEXT_DATA__.buildId}/show/${id}.json?id=${id}`
  }
  let proxyImage = image.hasOwnProperty('medium') ? image['medium'] : image['original']
  return (
    <Link href={`/show/${id}`}>
      <Prefetch {...prefetchProps}>
        <a href={`/show/${id}`}>
          <div
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.homeScrollLeave = window.scrollY
              }
            }}
            className="flex flex-col items-center text-center"
          >
            <Image proxyImage={proxyImage} />
            <h3 className="mt-3 text-gray-300 max-w-[250px]">{name}</h3>
          </div>
        </a>
      </Prefetch>
    </Link>
  )
}

export default Item
