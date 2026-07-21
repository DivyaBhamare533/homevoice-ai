import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchPanel from "./components/SearchPanel";
import EMICalculator from "./components/EMICalculator";
import CompareBar from "./components/CompareBar";
import CompareModal from "./components/CompareModal";

function App() {
  // Voice Search
  const [text, setText] = useState("Waiting for voice input...");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("Ready");

  // Property Modal
  const [selectedFlat, setSelectedFlat] = useState(null);

  // Chatbot
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Hello! I'm HomeVoice AI Assistant.\n\nI can help you find flats, compare cities, answer questions about parking, lift, hospitals and budgets."
    }
  ]);

  // Search History
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Compare Feature
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = (flat) => {
    setCompareList((prev) => {
      const exists = prev.find((f) => f.FlatID === flat.FlatID);

      if (exists) {
        return prev.filter((f) => f.FlatID !== flat.FlatID);
      }

      if (prev.length >= 3) {
        return prev;
      }

      return [...prev, flat];
    });
  };

  const removeFromCompare = (flatId) => {
    setCompareList((prev) => prev.filter((f) => f.FlatID !== flatId));
  };

  const clearCompare = () => {
    setCompareList([]);
    setShowCompare(false);
  };

  // Voice Response
  const speak = (message) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  // Search Flats using AWS API
  const searchFlats = async (query) => {

    // Save search history
    const updatedHistory = [
      query,
      ...history.filter(
        (item) => item.toLowerCase() !== query.toLowerCase()
      ),
    ].slice(0, 5);

    setHistory(updatedHistory);

    localStorage.setItem(
      "searchHistory",
      JSON.stringify(updatedHistory)
    );

    try {

      const response = await fetch(
        `https://4fw6qt2np7.execute-api.ap-south-1.amazonaws.com/search?query=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();

      setResults(data);
      setStatus("✅ Search Completed");

      if (data.length === 0) {

        speak(
          "Sorry, I couldn't find any matching flats."
        );

      } else {

        const cheapest = Math.min(
          ...data.map((flat) => Number(flat.Price))
        );

        const cheapestInLakhs = (
          cheapest / 100000
        ).toFixed(0);

        speak(
          `I found ${data.length} matching flats. The cheapest flat costs ${cheapestInLakhs} lakh rupees.`
        );

      }

    } catch (error) {

      console.error(error);

      setStatus("❌ Error");

      speak(
        "Sorry, something went wrong while searching."
      );

    }
  };

  // Voice Recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setStatus("🎤 Listening...");
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setText(transcript);
      setStatus("🔍 Searching...");

      searchFlats(transcript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setStatus("❌ Error");
      alert("Voice recognition failed. Please try again.");
    };
  };

  // Quick Questions
  const quickQuestions = [
    "Cheapest Flat",
    "Budget under 50 lakh",
    "Parking",
    "Lift",
    "Nearby Hospital",
    "How many flats?",
    "Compare Cities",
  ];

  // Chatbot
 const sendMessage = (question = chatInput) => {

  if (!question.trim()) return;

  const userQuestion = question.trim();

  if (question !== chatInput) {
    setChatInput("");
  }

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userQuestion,
    },
  ]);

    const q = userQuestion.toLowerCase();

    let answer = "Sorry, I don't understand that yet.";

    if (results.length === 0) {
      answer =
        "Please search for flats first using voice search so I have data to answer.";
    }

    else if (
      q.includes("cheapest") ||
      q.includes("cheap") ||
      q.includes("lowest")
    ) {

      const cheapest = results.reduce((a, b) =>
        Number(a.Price) < Number(b.Price) ? a : b
      );

      answer =
        `🏠 Cheapest Flat\n\n` +
        `${cheapest.BHK}\n` +
        `📍 ${cheapest.City}\n` +
        `💰 ₹${Number(cheapest.Price).toLocaleString("en-IN")}`;
    }

    else if (q.includes("parking")) {

      const parking = results.filter(
        (f) =>
          f.Parking === true ||
          f.Parking === "Yes"
      );

      answer = `🚗 ${parking.length} flat(s) have parking.`;
    }

    else if (q.includes("lift")) {

      const lift = results.filter(
        (f) =>
          f.Lift === true ||
          f.Lift === "Yes"
      );

      answer = `🛗 ${lift.length} flat(s) have lift.`;
    }

    else if (q.includes("hospital")) {

      answer = results
        .map(
          (f) =>
            `🏠 ${f.BHK} (${f.City})\n🏥 ${f.Hospital}`
        )
        .join("\n\n");
    }

    else if (
      q.includes("how many") ||
      q.includes("count")
    ) {

      answer = `I found ${results.length} matching flats.`;
    }

    else if (
      q.includes("budget") ||
      q.includes("50 lakh")
    ) {

      const filtered = results.filter(
        (f) => Number(f.Price) <= 5000000
      );

      answer =
        `I found ${filtered.length} flat(s) under ₹50 lakh.`;
    }

    else if (q.includes("compare")) {

      const cities = [...new Set(results.map((f) => f.City))];

      answer =
        `Available cities:\n\n${cities.join("\n")}`;
    }

    setTimeout(() => {

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: answer,
        },
      ]);

      speak(answer);

    }, 500);

    setChatInput("");
  };

  // Purely cosmetic, deterministic "rating" derived from existing flat data.
  // Does not read/write any state and does not affect business logic.
  const getDisplayRating = (flat) => {
    const seed = String(flat?.FlatID ?? flat?.BHK ?? "0");
    let sum = 0;
    for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
    return (4.3 + (sum % 7) / 10).toFixed(1);
  };

  const isBusy = status.includes("Listening") || status.includes("Searching");

  return (
    <div className="page">

      {/* ================= STICKY HEADER ================= */}
      <Header />

      {/* ================= HERO ================= */}
     <Hero
  status={status}
  startListening={startListening}
/>

      {/* ================= VOICE SEARCH / STATUS PANEL ================= */}
      <SearchPanel
  status={status}
  text={text}
  quickQuestions={quickQuestions}
  searchFlats={searchFlats}
  isBusy={isBusy}
/>

      {/* ================= RECENT SEARCHES ================= */}
      {history.length > 0 && (
        <section className="history">
          <h3 className="section-label">🕒 Recent Searches</h3>
          <div className="history__list">
            {history.map((item, index) => (
              <button
                key={index}
                className="history-btn"
                onClick={() => {
                  setText(item);
                  setStatus("🔍 Searching...");
                  searchFlats(item);
                }}
              >
                <span className="history-btn__dot" />
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROPERTY LISTINGS ================= */}
      <section className="listings" id="listings">
        <div className="listings__ambient" aria-hidden="true">
          <span className="glow glow--gold" />
          <span className="glow glow--emerald" />
          <span className="listings__grid" />
        </div>

        <div className="listings__header">
          <h2 className="section-title">Curated Residences</h2>
          <p className="section-subtitle">
            {results.length > 0
              ? `${results.length} homes matched to your search`
              : "Use voice search above to discover matching homes"}
          </p>
        </div>

        <div className="results">
          {results.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">🏡</span>
              <p>No flats found yet. Try the mic above.</p>
            </div>
          ) : (
            results.map((flat) => {
              const isComparing = compareList.some((f) => f.FlatID === flat.FlatID);

              return (
              <div
                key={flat.FlatID}
                className="card"
                onClick={() => setSelectedFlat(flat)}
              >
                <div className="card__image-wrap">
                  <img
                    src={flat.ImageURL}
                    alt={flat.BHK}
                    className="flat-image"
                  />
                  <span className="badge badge--ai">✨ AI Match</span>
                  <span className="badge badge--rating">★ {getDisplayRating(flat)}</span>
                  <span className="badge badge--verified">✔ Verified</span>
                  <div className="card__image-scrim">
                    <p className="card__price">
                      ₹{Number(flat.Price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="card__body">
                  <div className="card__title-row">
                    <h2>{flat.BHK}</h2>
                  </div>

                  <p className="card__location">📍 {flat.City}</p>
                  <p className="card__hospital">🏥 {flat.Hospital}</p>

                  <div className="card__amenities">
                    <span className={`amenity ${flat.Lift ? "amenity--on" : ""}`}>
                      🛗 Lift {flat.Lift ? "Yes" : "No"}
                    </span>
                    <span className={`amenity ${flat.Parking ? "amenity--on" : ""}`}>
                      🚗 Parking {flat.Parking ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="card__cta-row">
                    <button
                      className="map-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `https://www.google.com/maps?q=${flat.Latitude},${flat.Longitude}`,
                          "_blank"
                        );
                      }}
                    >
                      📍 View on Map
                    </button>

                    <button
                      className={`compare-toggle ${isComparing ? "compare-toggle--active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(flat);
                      }}
                    >
                      {isComparing ? "✓ Comparing" : "+ Compare"}
                    </button>
                  </div>
                </div>
              </div>
              );
            })
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer" id="footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="brand__mark">🏠</span>
            <span className="brand__name">HomeVoice<span className="brand__accent">AI</span></span>
            <p>Voice-first home discovery for premium residences.</p>
          </div>
          <div className="site-footer__col">
            <h4>Explore</h4>
            <a href="#listings">Listings</a>
            <a href="#search">Voice Search</a>
          </div>
          <div className="site-footer__col">
            <h4>Company</h4>
            <a href="#footer">About</a>
            <a href="#footer">Contact</a>
          </div>
          <div className="site-footer__col">
            <h4>Powered by</h4>
            <a href="#footer">AWS • AI • Speech</a>
          </div>
        </div>
        <p className="site-footer__bottom">© {new Date().getFullYear()} HomeVoice AI. All rights reserved.</p>
      </footer>

      {/* ================= COMPARE BAR ================= */}
      <CompareBar
        compareList={compareList}
        onRemove={removeFromCompare}
        onOpen={() => setShowCompare(true)}
        onClear={clearCompare}
      />

      {/* ================= COMPARE MODAL ================= */}
      {showCompare && compareList.length >= 2 && (
        <CompareModal
          compareList={compareList}
          onClose={() => setShowCompare(false)}
        />
      )}

      {/* ================= CHATBOT ================= */}

      <button
        className="chat-fab"
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? "✖" : "💬"}
      </button>

      {chatOpen && (

        <div className="chat-window glass">

          <div className="chat-header">
            <div className="chat-header__title">
              <span className="chat-header__avatar">🏠</span>
              <span>HomeVoice AI Assistant</span>
            </div>

            <button
              onClick={() => setChatOpen(false)}
            >
              ✖
            </button>

          </div>

          <div className="chat-body">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={
                  msg.sender === "bot"
                    ? "bot-message"
                    : "user-message"
                }
              >
                {msg.text}
              </div>

            ))}

            {/* Quick Questions */}

            <div className="quick-actions">

              {quickQuestions.map((item) => (

                <button
                  key={item}
                  className="quick-btn"
                  onClick={() => {

                    setChatInput(item);

                    setTimeout(() => {
                      sendMessage(item);
                    }, 100);

                  }}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask anything..."
              value={chatInput}
              onChange={(e) =>
                setChatInput(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  sendMessage();

                }

              }}
            />

            <button
              onClick={sendMessage}
            >
              ➤
            </button>

          </div>

        </div>

      )}

      {/* ================= PROPERTY DETAILS MODAL ================= */}

      {selectedFlat && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedFlat(null)}
        >

          <div
            className="modal glass"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal__close-x"
              onClick={() => setSelectedFlat(null)}
            >
              ✖
            </button>

            <div className="modal__image-wrap">
              <img
                src={selectedFlat.ImageURL}
                alt={selectedFlat.BHK}
                className="modal-image"
              />
              <span className="badge badge--ai">✨ AI Match</span>
            </div>

            <div className="modal__body">

              <div className="modal__title-row">
                <h2>{selectedFlat.BHK}</h2>
                <span className="modal__rating">★ {getDisplayRating(selectedFlat)}</span>
              </div>

              <p className="modal__price">
                ₹{Number(selectedFlat.Price).toLocaleString("en-IN")}
              </p>

              <p className="modal__location">
                📍 {selectedFlat.City}
              </p>

              <div className="modal__amenities">
                <span className={`amenity ${selectedFlat.Lift ? "amenity--on" : ""}`}>
                  🛗 Lift: {selectedFlat.Lift ? "Available" : "Not Available"}
                </span>
                <span className={`amenity ${selectedFlat.Parking ? "amenity--on" : ""}`}>
                  🚗 Parking: {selectedFlat.Parking ? "Available" : "Not Available"}
                </span>
                <span className="amenity amenity--on">
                  🏥 {selectedFlat.Hospital}
                </span>
              </div>

                <div className="agent-section">
  <h3>Agent Details</h3>

  <p><strong>👤 Name:</strong> {selectedFlat.AgentName}</p>

  <p><strong>📞 Phone:</strong> {selectedFlat.AgentPhone}</p>

  {selectedFlat.AgentEmail && (
    <p><strong>✉️ Email:</strong> {selectedFlat.AgentEmail}</p>
  )}

  
</div>

              {/* ================= EMI CALCULATOR ================= */}
              <EMICalculator price={Number(selectedFlat.Price)} />

              <div className="modal__actions">
                <button
                  className="map-btn"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${selectedFlat.Latitude},${selectedFlat.Longitude}`,
                      "_blank"
                    )
                  }
                >
                  📍 View on Map
                </button>

                <button
                  className="call-btn"
                  onClick={() =>
                    window.open(`tel:${selectedFlat.Phone || "+919876543210"}`, "_self")
                  }
                >
                  📞 Call
                </button>

                <button
                  className="whatsapp-btn"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${(selectedFlat.Phone || "919876543210").replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hi, I'm interested in ${selectedFlat.BHK} in ${selectedFlat.City}`
                      )}`,
                      "_blank"
                    )
                  }
                >
                  💬 WhatsApp
                </button>
              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedFlat(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );




  
}

export default App;
