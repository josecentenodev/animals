import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="/assets/images/animalsLogo.png"
            alt="logo"
            width={75}
            height={75}
            className='rounded-full'
          />
        </Link>

        <p>2024 Animals. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer