import { useEffect } from "react";

export default function LineCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    (async () => {
      try {
        const res = await fetch(
          `https://fearsome-ollie-correspondently.ngrok-free.dev/api/v1/auth/line/callback?code=${code}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "ngrok-skip-browser-warning": "true",
            },
          }
        );
        console.log("res:", res);

        const data = await res.json();
        console.log("DATA:", data);
        if (data.id) {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-3"></div>
  );
}
