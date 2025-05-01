import Image from 'next/image';

export default function About() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="absolute top-0 left-0 w-full flex items-start justify-between min-h-screen p-4">
                <div className="flex items-center gap-2">
                    <Image 
                        src="/mixhaus.svg"
                        alt="Mixhaus logomark"
                        width={100}
                        height={100}
                    />
                    <span className="text-lg font-bold"><a href="/">MixHaus</a></span>
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
            <main>

            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center p-4 mt-25">
                <span className="flex items-center gap-2">
                    Mix. Sip. Repeat.
                </span>
                <a 
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="about">
                    About
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://forms.gle/rxcNXJFtwxizjCxA8"
                    target="_blank"
                    rel="noopener noreferrer">
                    Contact
                </a>
            </footer>
        </div>
    )
}