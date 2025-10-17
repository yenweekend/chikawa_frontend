import { Link } from "react-router-dom";

import { NAVIGATIONS } from "@/user/constants/paths";

import { Navigation } from "@/user/components/ui/navigation";

export const Header = () => {
  return (
    <>
      <div className="h-10 bg-red-400 text-lg text-white font-bold flex items-center justify-center">
        あなたにぴったりの一品が見つかる
      </div>
      <div className="w-full sticky top-0  bg-red-100 flex flex-col z-100">
        <div className="flex items-center justify-between py-5 px-20">
          <div className="basis-1/3 relative">
            <div className="absolute flex flex-col gap-2 items-center justify-center -top-5">
              <p className="rounded-full w-50 bg-white border border-black text-center py-1">
                Hello! Guest
              </p>
              <div className="w-40 ">
                <img src="https://chiikawamarket.jp/cdn/shop/files/welcome_320x.png?v=16266376846941523964" />
              </div>
            </div>
          </div>
          <div className="basis-1/3 flex items-center justify-center">
            <div className="w-[300px] ">
              <img
                src="https://chiikawamarket.jp/cdn/shop/files/logo_chiikawamarket.png?v=1659340705&width=450"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="basis-1/3 flex items-center gap-2 justify-end">
            <Link className="w-14 h-14" to={"/"}>
              <img src="https://chiikawamarket.jp/cdn/shop/files/en_btn_login_112x.png?v=1848369783586275347" />
            </Link>
            <Link className="w-14 h-14" to={"/"}>
              <img src="https://chiikawamarket.jp/cdn/shop/files/en_btn_cart_112x.png?v=8880665500984661040" />
            </Link>
          </div>
        </div>
        <div className="bg-yellow-100 flex items-center justify-center  py-3">
          <Navigation navigation={NAVIGATIONS} />
        </div>
      </div>
    </>
  );
};
