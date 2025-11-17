"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Message {
  sender: string;
  text: string;
}

export default function PixelHandheld() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "me", text: "Chào mừng bạn đến với Game Truy Tìm Thái Sơn!!!" },
    { sender: "me", text: "Giỡn thoi 👀" },
    {
      sender: "me",
      text: "Sắp tới là Lễ tốt nghiệp của Sơn đó, bạn cho mình xin tên để xác nhận tham gia 'Game' này nha.",
    },
  ]);

  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [typingText, setTypingText] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [buttonPos, setButtonPos] = useState({
  a: { x: 0, y: 0 },
  b: { x: 0, y: 0 },
  dpad: { x: 0, y: 0 },
});
  // ✅ Hiệu ứng typing
  useEffect(() => {
    if (displayedMessages.length >= messages.length) return;

    const nextMessage = messages[displayedMessages.length];
    if (!nextMessage) return;

    let index = 0;
    setTypingText("");

    const interval = setInterval(() => {
      setTypingText((prev) => prev + nextMessage.text[index]);
      index++;

      if (index === nextMessage.text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayedMessages((prev) => [
            ...prev,
            { sender: nextMessage.sender, text: nextMessage.text },
          ]);
          setTypingText("");
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [displayedMessages, messages]);

  // 🎮 Khi click vào từng nút → chỉ nút đó di chuyển ngẫu nhiên
// 🎮 Khi click vào từng nút → hiệu ứng riêng cho A, B, và D-pad
const handleButtonClick = (button: "a" | "b" | "dpad") => {
  if (button === "dpad") {
    // 🔄 Xoay chong chóng trong 2.5 giây
    const dpad = document.querySelector(".dpad") as HTMLElement;
    if (dpad) {
      dpad.style.transition = "transform 0.2s linear";
      let angle = 0;
      const spin = setInterval(() => {
        angle += 40; // tốc độ xoay
        dpad.style.transform = `rotate(${angle}deg)`;
      }, 50);

      setTimeout(() => {
        clearInterval(spin);
        dpad.style.transform = `rotate(0deg)`; // trở lại vị trí cũ
      }, 2500);
    }
    return;
  }

  // 🔹 Với các nút A hoặc B → dịch chuyển xa ngẫu nhiên
  const randomX = Math.floor(Math.random() * 360 - 180);
  const randomY = Math.floor(Math.random() * 200 - 100);

  setButtonPos((prev) => ({
    ...prev,
    [button]: { x: randomX, y: randomY },
  }));

  const btn = document.querySelector(`.btn.${button}`) as HTMLElement;
  if (btn) {
    btn.style.transition = "transform 0.4s ease, rotate 0.3s ease";
    btn.style.rotate = `${Math.random() * 40 - 20}deg`;
    setTimeout(() => {
      btn.style.rotate = "0deg";
    }, 400);
  }
};



  // ✅ Gửi tin nhắn
  const handleSend = () => {
    if (!input.trim()) return;

    const name = input.trim().toLowerCase();

    if (hasPlayed) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "me", text: "Hết rồi má" },
      ]);
      setInput("");
      return;
    }

    let newMessages: Message[] = [{ sender: "user", text: input }];

    // 🎯 Các trường hợp đặc biệt
    if (name === "uyên" || name === "hàn uyên") {
      newMessages.push(
        { sender: "me", text: "Hế nhô bé nhó :)))" },
        {
          sender: "me",
          text: "Chúc mừng bé đã nhận được 'vé' tham gia Lễ tốt nghiệp của 2!",
        },
        { sender: "me", text: "Gửi bé cái 'vé' với 'map' nhe. Cổm mơnnn :3" }
      );
    } else if (name === "thy" || name === "mai thy") {
      newMessages.push(
        { sender: "me", text: "Moàyyyyyy" },
        {
          sender: "me",
          text: "Tốt nghiệp kao",
        },
        {
          sender: "me",
          text: "Vé, map đây, lên đồ, vác xác tới cho kaooo!",
        }
      );
    } else if (name === "ngọc" || name === "bích ngọc") {
      newMessages.push(
        { sender: "me", text: "Btaskee xin chàoooo :)))" },
        {
          sender: "me",
          text: "Chúc mừng Bích Ngọc đã nhận được 'vé' tham gia Lễ tốt nghiệp của Sơn!",
        },
        {
          sender: "me",
          text: "Gửi bạn cái 'vé' với 'map' nhe. Sắp xếp tham gia được thì quý lắm nhe. Cám mơnnn",
        }
      );
    } else if (name === "my" || name === "hạ my") {
      newMessages.push(
        { sender: "me", text: "Mysannnnnnn" },
        {
          sender: "me",
          text: "Chúc mừng Mysan đã nhận được 'vé' tham gia Lễ tốt nghiệp của 2!",
        },
        { sender: "me", text: "Vé với map đây nghen. Xia xìaaa" }
      );
    } else if (name === "hào" || name === "hoàng hào") {
      newMessages.push(
        { sender: "me", text: "Xanh SM xin chàoooo :)))" },
        {
          sender: "me",
          text: "Chúc mừng ông đã nhận được 'vé' tham gia Lễ tốt nghiệp của tui!",
        },
        {
          sender: "me",
          text: "Vé với map đây nghen, được thì gủ thêm Cô gái Tây Nguyên đi cho dui nghe :3",
        }
      );
    } else if (name === "tín" || name === "minh tín") {
      newMessages.push(
        { sender: "me", text: "Mập" },
        { sender: "me", text: "Gửi đại gia Tiên An 'vé' tham gia Lễ tốt nghiệp ạ!" },
        { sender: "me", text: "Vé với map đây nghe. :)))" }
      );
    } else if (name === "hiệu" || name === "khánh hiệu") {
      newMessages.push(
        { sender: "me", text: "Cu em" },
        { sender: "me", text: "Gửi cu em 'vé' tham gia Lễ tốt nghiệp nghe!" },
        { sender: "me", text: "Vé với map đây nghe. :)))" }
      );
    }  else {
      // Mặc định
      newMessages.push(
        { sender: "me", text: `Hello ${input}!` },
        {
          sender: "me",
          text: `Chúc mừng ${input} đã nhận được 'vé' tham gia Lễ tốt nghiệp của Sơn nha!`,
        },
        {
          sender: "me",
          text: `Sẽ rất tuyệt nếu ${input} có thể góp mặt trong ngày này đó. Sơn gửi ${input} 'vé' với 'map' đây nha.`,
        },
        {
          sender: "me",
          text: `Cảm ơn ${input} đã kiên nhẫn xem hết trò mèo này :)))`,
        }
      );
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setTypingText("");
    setDisplayedMessages((prev) => [...prev]);
    setInput("");

    // Gửi “vé” và “map” sau hội thoại
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "me", text: "vé" }]);
    }, 2500);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "me", text: "map" }]);
      setHasPlayed(true);
    }, 4500);
  };

  // ✅ Hoa giấy rơi khi mở vé
  useEffect(() => {
    if (!showOverlay) return;

    const canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const confettiCount = 120;
    const confetti = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      r: Math.random() * 6 + 2,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: Math.random() * Math.PI,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      confetti.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.5, p.tilt, 0, 2 * Math.PI);
        ctx.fill();
      });

      confetti.forEach((p) => {
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        p.x += Math.sin(p.d);
        p.tiltAngle += 0.1;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        if (p.y > window.innerHeight) {
          p.y = -10;
          p.x = Math.random() * window.innerWidth;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [showOverlay]);

  // ESC để đóng overlay
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowOverlay(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div className="page">
        <div className="handheld">
          {/* Màn hình chat */}
          <div className="screen-bezel large">
            <div className="screen-inner extended">
              <div className="chat-area">
                {displayedMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`msg ${msg.sender === "me" ? "left" : "right"}`}
                    onClick={() => {
                      if (msg.sender !== "me") return;
                      const text = msg.text.trim().toLowerCase();

                      if (text === "vé") setShowOverlay(true);
                      if (text === "map")
                        window.open("https://maps.app.goo.gl/ejSNzUmnaKCpMWyAA", "_blank");
                    }}
                    style={{
                      cursor:
                        msg.sender === "me" &&
                        ["vé", "map"].includes(msg.text.trim().toLowerCase())
                          ? "pointer"
                          : "default",
                      textDecoration:
                        msg.sender === "me" &&
                        ["vé", "map"].includes(msg.text.trim().toLowerCase())
                          ? "underline"
                          : "none",
                    }}
                  >
                    {msg.text}
                  </div>
                ))}

                {typingText && (
                  <div className="msg left">
                    {typingText}
                    <span className="cursor">_</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ô nhập */}
          <div className="input-section">
            <input
              className="pixel-input"
              type="text"
              placeholder={hasPlayed ? "Game over!!!" : "Nhập tên của bạn..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="pixel-button" onClick={handleSend}>
              Gửi
            </button>
          </div>

          {/* 🎮 Nút điều khiển (mỗi nút di chuyển riêng khi click) */}
<div className="controls lower move-down">
  <div
    className="dpad"
    onClick={() => handleButtonClick("dpad")}
    style={{
      transform: `translate(${buttonPos.dpad.x}px, ${buttonPos.dpad.y}px)`,
      transition: "transform 0.4s ease",
    }}
  >
    <div className="dpad-h" />
    <div className="dpad-v" />
  </div>

  <div className="ab-buttons">
    <div
      className="btn a"
      onClick={() => handleButtonClick("a")}
      style={{
        transform: `translate(${buttonPos.a.x}px, ${buttonPos.a.y}px)`,
        transition: "transform 0.4s ease",
      }}
    >
      A
    </div>
    <div
      className="btn b"
      onClick={() => handleButtonClick("b")}
      style={{
        transform: `translate(${buttonPos.b.x}px, ${buttonPos.b.y}px)`,
        transition: "transform 0.4s ease",
      }}
    >
      B
    </div>
  </div>
</div>


        </div>
      </div>

      {/* Overlay + hiệu ứng hoa giấy */}
      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <canvas
            id="confetti-canvas"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowOverlay(false);
            }}
          >
            ✕
          </button>
          <div className="overlay-content">
            <Image
              src="/invitation.jpg"
              alt="Thiệp mời tốt nghiệp"
              width={1200}
              height={800}
              className="overlay-image"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 0 25px rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
