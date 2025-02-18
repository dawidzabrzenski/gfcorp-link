import GFLogo from "../assets/gflogo.webp";

function Logo() {
  return (
    <h1 className="flex w-full justify-center border-b-[1px] border-dark-mainborder py-4">
      <img className="w-[50%]" src={GFLogo} />
    </h1>
  );
}

export default Logo;
