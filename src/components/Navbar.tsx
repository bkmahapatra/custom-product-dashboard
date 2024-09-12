import Logo from "../assets/monkLogo.png";
const Navbar = () => {
  return (
    <div className="w-full h-12 bg-white shadow-md flex items-center px-10 gap-3 sticky top-0 z-50">
      <img src={Logo} alt="logo" className="w-10" />
      <p className="text-gray-700 font-bold">Monk Upsell & Cross-sell</p>
    </div>
  );
};

export default Navbar;
