import { useEffect } from "react";

const textMap = {
  one: "text-xl",
  two: "text-2xl",
  three: "text-3xl",
  four: "text-4xl",
  five: "text-5xl",
};

export default function Modal({
  width = 30,
  title,
  children,
  open,
  onClose,
  textsize,
}) {
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  }, [onClose]);
  return (
    <>
      {open ? (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-40 z-30 "></div>
          <div className="fixed inset-0 z-40 " onClick={onClose}>
            <div className="flex justify-center items-center min-h-screen pt-8">
              <div
                className="bg-yellow-100 rounded-2xl shadow-lg p-4 overflow-auto max-h-[70vh]"
                style={{ width: `${width}rem` }}
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex justify-between items-center p-4 border-b">
                    <button className="invisible">X</button>
                    <h5 className={`${textMap[textsize]} font-semibold`}>
                      {title}
                    </h5>
                    <button onClick={onClose}>&#10005;</button>
                  </div>
                  <div className="p-4">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
