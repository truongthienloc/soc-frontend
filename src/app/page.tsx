import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">SoC Simulator</h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl">
            An advanced research platform for System-on-Chip simulation and analysis
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/soc"
              className="rounded-lg bg-highlight-s4 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Launch Simulator
            </Link>
            <Link
              href="/soc/guide"
              className="rounded-lg bg-white px-6 py-3 font-bold text-blue-700 transition-colors hover:bg-gray-100"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Project Overview</h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg">
                The SoC Simulator is a research tool designed to model and analyze System-on-Chip
                architectures, providing researchers and students with a platform to understand
                complex hardware interactions.
              </p>
              <p className="mb-4 text-lg">
                Our simulator aims to bridge the gap between theoretical knowledge and practical
                implementation by providing a visual and interactive environment for exploring SoC
                designs.
              </p>
              <p className="text-lg">
                This project is developed at the University of Information Technology (UIT) under
                the guidance of Professor Trần Đại Dương.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative h-80 w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/logo/LogoUIT.png"
                  alt="UIT Logo"
                  className="object-contain"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-s1 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">RISC-V Processor Simulation</h3>
              <p>
                Full simulation of RISC-V processor architecture with cycle-accurate execution and
                register visualization.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-s2 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Memory Management</h3>
              <p>
                Advanced memory system modeling with TLB, page tables, and memory mapping for
                realistic system behavior.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-s3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Interconnect & Bus Modeling</h3>
              <p>
                Detailed simulation of interconnect fabrics, bus protocols, and communication
                between SoC components.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-s4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">DMA & Peripheral Support</h3>
              <p>
                Integrated DMA controller and peripheral devices such as LED matrix, keyboard, and
                monitor for complete system simulation.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-s5 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Assembly Code Editor</h3>
              <p>
                Integrated code editor with syntax highlighting, disassembly view, and breakpoint
                support for programming and debugging.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Performance Analysis</h3>
              <p>
                Detailed performance metrics and visualization of system behavior through
                cycle-accurate simulation and data logging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Team Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Research Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-16 w-16 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">Trần Đại Dương</h3>
              <p className="text-gray-600">Project Instructor</p>
              <a
                href="https://www.linkedin.com/in/duong-tran-3a650a113/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-16 w-16 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">Nguyễn Gia Bảo Ngọc</h3>
              <p className="text-gray-600">Lead Developer</p>
              <a
                href="https://www.linkedin.com/in/ngbn111723/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-16 w-16 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">Trương Thiên Lộc</h3>
              <p className="text-gray-600">Lead Developer</p>
              <a
                href="https://www.linkedin.com/in/truongthienloc/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Explore the Simulator</h2>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-lg bg-gray-200">
              <div className="flex h-full items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-24 w-24 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="mb-6 text-lg">
                Experience the power of our SoC simulator with its intuitive interface and
                comprehensive visualization tools. The simulator provides a hands-on learning
                environment for students and researchers to explore SoC architecture.
              </p>
              <Link
                href="/soc"
                className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-700"
              >
                Launch Simulator
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="ml-2 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Research Publications</h2>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 rounded-lg bg-gray-50 p-6 shadow">
              <h3 className="mb-2 text-xl font-bold">
                SoC Simulator: A Comprehensive Educational Tool for Computer Architecture
              </h3>
              <p className="mb-3 text-gray-600">
                University of Information Technology (UIT) - Technical Report
              </p>
              <p className="mb-4">
                This paper presents the design and implementation of an educational SoC simulator
                that provides students with a visual and interactive environment for exploring
                computer architecture concepts.
              </p>
              <div className="flex justify-end">
                <Link href="#" className="text-blue-500 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
            <div className="mb-6 rounded-lg bg-gray-50 p-6 shadow">
              <h3 className="mb-2 text-xl font-bold">
                Visual Representation of Datapath Execution in RISC-V Processors
              </h3>
              <p className="mb-3 text-gray-600">Computing Science and Engineering Conference</p>
              <p className="mb-4">
                A methodology for visualizing the execution of instructions through a processor
                datapath, implemented in our SoC simulator to enhance understanding of computer
                architecture.
              </p>
              <div className="flex justify-end">
                <Link href="#" className="text-blue-500 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Explore SoC Architecture?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Start your journey into System-on-Chip design and simulation with our comprehensive
            platform.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/soc"
              className="rounded-lg bg-white px-8 py-3 font-bold text-blue-700 transition-colors hover:bg-gray-100"
            >
              Launch Simulator
            </Link>
            <Link
              href="/soc/guide"
              className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-colors hover:bg-blue-800"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">SoC Simulator Research Project</p>
              <p className="text-sm">University of Information Technology (UIT)</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-blue-400">
                GitHub
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                Research
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} University of Information Technology. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
