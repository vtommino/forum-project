import flagUk from "../images/circle-flags_uk.png";

export default function Dropdown() {
  return (
    <div className="border border-white rounded-lg flex justify-between items-center pt-2 pb-2 pl-6 pr-6 gap-5">
      <div>
        <img src={flagUk} alt="Uk-round-flag" className="w-8 h-8" />
      </div>
      <div>English</div>
    </div>
  );
}
