import React from "react";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-zinc-900 to-black pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-900/30 to-black/30" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
              Welcome to Support
            </h1>
            <p className="mx-auto max-w-[700px] text-lg bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent font-medium">
              Get help with your device. Find answers, troubleshoot issues, and
              connect with our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"> {/* Updated grid container */}
            {[
              {
                title: "Device Care",
                description: "Tips and guides for maintaining your device",
                icon: "📱",
              },
              {
                title: "Warranty Info",
                description: "Check your warranty status and coverage",
                icon: "📋",
              },
              {
                title: "Service Centers",
                description: "Find authorized service locations near you",
                icon: "🏪",
              },
              {
                title: "User Guides",
                description: "Detailed documentation and tutorials",
                icon: "📚",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-800/50 group"
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                  <span className="mr-2 text-2xl">{item.icon}</span>
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-lg bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent font-medium">
                Find quick answers to common questions about our products and
                services
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  question:
                    "Should I upgrade from an iPhone 13 or 14 to an iPhone 15?",
                  answer:
                    "If your current iPhone is still performing well and receiving software updates, there's no urgent need to upgrade. The iPhone 15 series offers incremental improvements, but significant changes might not be necessary if your current device meets your needs.",
                },
                {
                  question:
                    "What camera features can I expect from the iPhone 15 series?",
                  answer:
                    "The iPhone 15 Pro and other premium models feature multiple lenses, including a primary wide lens, ultra-wide lens, and sometimes a telephoto lens for improved zoom capabilities.",
                },
                {
                  question:
                    "What happens if an app isn't compatible with my iPhone 15?",
                  answer:
                    "You may be able to find a similar app to replace the incompatible one. Alternatively, contact the app developer to inquire about a potential 64-bit version.",
                },
                {
                  question: "What is 5G Standalone on iPhone?",
                  answer:
                    "5G Standalone is a pure 5G network architecture that operates independently of 4G networks, potentially offering improved performance and lower latency.",
                },
                {
                  question: "What is the meaning of 5G status icons on iPhone?",
                  answer:
                    "The 5G status icons indicate your current connection type. Different icons show whether you're connected to 5G, 5G+, or other network types.",
                },
                {
                  question: "Who designed the iPhone?",
                  answer:
                    "The iPhone was designed by Apple's design team, led by Jony Ive during the original iPhone's development.",
                },
                {
                  question: "What font does the iPhone interface use?",
                  answer:
                    "The iPhone interface uses a custom font called San Francisco, which was designed by Apple for optimal readability on digital displays.",
                },
                {
                  question:
                    "What ringtone does the iPhone use? Where can I download it?",
                  answer:
                    "The default iPhone ringtone is called 'Opening'. It comes pre-installed on all iPhones and cannot be downloaded separately. However, you can set custom ringtones or purchase additional ones from the iTunes Store.",
                },
                {
                  question:
                    "Can I add additional or custom ringtones to the iPhone?",
                  answer:
                    "Yes, you can add custom ringtones to your iPhone through iTunes or by purchasing them from the iTunes Store. You can also create custom ringtones from your own audio files.",
                },
                {
                  question:
                    "How does the iPhone 'multi-touch' interface work? Who developed it originally?",
                  answer:
                    "The iPhone's multi-touch interface allows the screen to recognize multiple touch points simultaneously, enabling gestures like pinch-to-zoom. This technology was originally developed by Apple for the first iPhone and has since become a standard feature in modern smartphones.",
                },
              ].map((item) => (
                <details
                  key={item.question}
                  className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-800/50"
                >
                  <summary className="font-semibold cursor-pointer list-none">
                    <div className="flex justify-between items-center">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                        {item.question}
                      </span>
                      <span className="transform group-open:rotate-180 transition-transform duration-200 text-gray-400">
                        ▼
                      </span>
                    </div>
                  </summary>
                  <p className="mt-4 text-gray-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;