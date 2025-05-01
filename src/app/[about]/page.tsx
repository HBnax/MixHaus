import Image from 'next/image';
import Link from 'next/link';
export default function About() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="absolute top-0 left-0 w-full flex items-start justify-between h-[120px] p-4 z-10">
                <div className="flex items-center gap-2">
                    <Image 
                        src="/mixhaus.svg"
                        alt="Mixhaus logomark"
                        width={100}
                        height={100}
                    />
                    <span className="text-lg font-bold"><Link href="/">MixHaus</Link></span>
                    </div>
                    <div className='flex items-center' style={{marginTop: '30px', marginRight: '20px'}}>
                    <Image 
                        src="/glassIcon.svg"
                        alt="Mixhaus logomark"
                        width={30}
                        height={30}
                    />
                </div>
            </header>
            <div className="w-full h-[3px] bg-[#a984ee] absolute top-[120px]"></div>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold text-center">About</h1>
                        <p className="text-lg text-center mb-4 max-w-xl">
                            Welcome to MixHaus. We are passionate about mixology and aim to provide you
                            with a curated collection of delicious cocktails that you can easily make at home.
                            Whether you are a seasoned bartender or just starting out, we have something for everyone.
                            Cheers!
                        </p>
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center p-4 mt-25">
                <span className="flex items-center gap-2">
                    Mix. Sip. Repeat.
                </span>
                <Link 
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-[#c2a9f5]"
                    href="about">
                    About
                </Link>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-[#c2a9f5]"
                    href="https://forms.gle/rxcNXJFtwxizjCxA8"
                    target="_blank"
                    rel="noopener noreferrer">
                    Contact
                </a>
            </footer>
        </div>
    )
}