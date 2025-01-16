import "./ErrorServer.css";
import { useEffect } from "react";

export default function ErrorServer() {
  useEffect(() => {
    const eyes = document.getElementsByClassName("eye");

    const handleMouseMove = (event: { pageX: number; pageY: number }) => {
      for (let i = 0; i < eyes.length; i++) {
        const e: HTMLElement = eyes[i] as HTMLElement;
        const rect = e.getBoundingClientRect();
        const x: number = rect.left + rect.width / 2;
        const y: number = rect.top + rect.height / 2;
        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = rad * (180 / Math.PI) * -1 + 180;

        e.style.transform = `rotate(${rot}deg)`;
      }
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="box flex flex-col h-full w-full">
      <div>
        <span className="error-num">5</span>
        <div className="eye"></div>
        <div className="eye"></div>
      </div>

      <p className="sub-text">
        Terjadi kesalahan pada server. Silahkan coba beberapa saat lagi.
      </p>
      <a className="link-back" href="/">
        Kembali
      </a>
    </div>
  );
}
