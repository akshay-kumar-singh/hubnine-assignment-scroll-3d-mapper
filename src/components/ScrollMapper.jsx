import { highlightPhrases, fullText } from "../data/phrases";

const ScrollMapper = () => {
  const generateHighlightedText = () => {
    let html = fullText;
    highlightPhrases.forEach((phrase, idx) => {
      const safePhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(${safePhrase})`, "gi");
      html = html.replace(
        re,
        `<span id="phrase-${idx}" class="bg-yellow-300 font-semibold scroll-target">${phrase}</span>`
      );
    });
    return html;
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-blue-500");
      setTimeout(() => el.classList.remove("ring-2", "ring-blue-500"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Scroll Mapper – (Medical Phrases) (Assignment-1)
      </h1>

      <div className="flex gap-6 max-w-7xl mx-auto">
        <div className="w-1/3 overflow-y-scroll border rounded-lg p-6 bg-white shadow h-[75vh]">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Important Medical Phrases
          </h2>
          <ul className="space-y-3">
            {highlightPhrases.map((phrase, idx) => (
              <li
                key={idx}
                onClick={() => scrollTo(`phrase-${idx}`)}
                className="cursor-pointer text-blue-600 hover:underline hover:text-blue-800"
              >
                {phrase}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 overflow-y-scroll border rounded-lg p-6 bg-white shadow h-[75vh]">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Patient Case Report
          </h2>
          <div
            className="text-gray-800 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: generateHighlightedText() }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollMapper;
