import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="pt-[50px] pb-[25px] bg-yellow-200 px-20 flex flex-col items-center">
      <div className="flex items-center justify-center">
        <img src="https://chiikawamarket.jp/cdn/shop/files/btn_contact.png?v=1647955309&width=400" />
      </div>
      <div className="mt-[50px]">
        <ul className="flex items-center justify-center">
          <li>
            <Link to={"/"}>利用規約</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>プライバシーポリシー</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>特定商取引法に基づく表記</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>会社概要</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>利用ガイド</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>よくあるご質問</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>お問い合わせ</Link>
          </li>
          <div className="divide h-6 w-0 border border-black mx-4" />
          <li>
            <Link to={"/"}>OEMのご相談</Link>
          </li>
        </ul>
      </div>
      <div className="mt-[30px] flex items-center gap-4">
        <p>©nagano ©nagano / chiikawa committee ©Gray Parka Service</p>
      </div>
    </div>
  );
};
