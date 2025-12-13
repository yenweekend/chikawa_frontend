import { useEffect } from "react";

import { LoadingSpinner } from "@/user/components/overlays/loading-modal";

import { lineCallback } from "@/actions/auth-v2";
import { useUserStore } from "@/user/stores/signup-store";

export default function LineCallback() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const handleLineCallback = async () => {
      try {
        const data = await lineCallback(code);

        if (data.result.id) {
          setUser(data.result);
          window.location.href = "/";
        }
      } catch (err) {
        console.error("LINE LOGIN ERR:", err);
      }
    };

    if (code) {
      console.log("chạy");

      handleLineCallback();
    }
  }, []);

  return (
    <div className="h-full w-full items-center">
      <div className="mx-auto flex h-screen w-full flex-col items-center">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
