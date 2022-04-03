import Image from './Image'
import Link from 'next/link'
import { Prefetch } from '@layer0/react'

const Item = ({ id, name, image }) => {
  let prefetchProps = {}

  if (typeof window !== 'undefined') {
    prefetchProps.url = `/_next/data/${__NEXT_DATA__.buildId}/show/${id}.json?id=${id}`
  }

  return (
    <Link href={`/show/${id}`}>
      <Prefetch {...prefetchProps}>
        <a href={`/show/${id}`}>
          <div
            className="flex flex-col items-center text-center"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.homeScrollLeave = window.scrollY
              }
            }}
          >
            <Image
              proxyImage={image.hasOwnProperty('medium') ? image['medium'] : image['original']}
            />
            <h3 className="mt-3 text-gray-300 max-w-[250px]">{name}</h3>
          </div>
        </a>
      </Prefetch>
    </Link>
  )
}

export default Item
