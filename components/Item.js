import Image from './Image'
import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import { createNextDataURL } from '@layer0/next/client'

const Item = ({ id, name, image }) => {
  return (
    <Link href={`/show/${id}`}>
      <Prefetch
        url={createNextDataURL({
          href: `/show/${id}`,
          routeParams: { id },
        })}
      >
        <a href={`/show/${id}`}>
          <div
            className="flex flex-col items-center text-center"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.homeScrollLeave = window.scrollY
              }
            }}
          >
            <Image proxyImage={image.hasOwnProperty('medium') ? image['medium'] : image['original']} />
            <h3 className="mt-3 max-w-[250px] text-gray-300">{name}</h3>
          </div>
        </a>
      </Prefetch>
    </Link>
  )
}

export default Item
