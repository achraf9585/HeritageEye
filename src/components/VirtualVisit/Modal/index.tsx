import { useEffect } from "react";

import { CameraControls, Html } from "@react-three/drei";

import Image from "next/image";
import { useRouter } from "next/router";

import { TSiteModalProps } from "types/ISiteModalProps";

interface ModalParams {
  onClose: () => void;
  modal: TSiteModalProps;
  cameraControlsRef: React.RefObject<CameraControls>;
}

const Modal: React.FC<ModalParams> = ({
  onClose,
  modal,
  cameraControlsRef,
}) => {
  if(cameraControlsRef.current)
  {cameraControlsRef.current.enabled = false;}

  const text = modal.text;
  const textWithNewLine = text.replace("\\n", "<br/>");
  const { locale } = useRouter();

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement)?.classList?.contains(
          "backdrop-blur-xl"
        ) ||
        (event.target as HTMLElement)?.classList?.contains("space-y-6")
      ) {
        onClose();
      }
    };

    document.addEventListener("click", closeOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, [onClose]);

  return (
    <Html center>
      {modal.image !== null ? (
        <div
          title="close"
          className="cursor-pointer backdrop-blur-xl h-screen w-screen position-unset rtl:translate-x-[100vw]"
        >
          <div className="px-4 cursor-pointer max-h-[80vh] space-y-6 flex justify-center items-center translate-y-[10vh]">
            <Image
              src={modal.image}
              alt="building"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 800
                  : window.innerWidth >= 2000
                  ? 530
                  : window.innerWidth >= 750
                  ? 390
                  : 300
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 800
                  : window.innerWidth >= 2000
                  ? 530
                  : window.innerWidth >= 750
                  ? 390
                  : 300
              }
              className="rounded-lg"
              onClick={() => onClose()}
            />
          </div>
        </div>
      ) : (
        <div
          title="close"
          className="h-screen -translate-y-[1vh]  flex z-50 rtl:translate-x-[70vw] w-[70vw] mt-[30vh] position-unset "
        >
          <div
            id="defaultModal"
            aria-hidden="true"
            className=" top-0 left-0 right-0 z-50  md:inset-0 h-modal w-full"
          >
            <div className="relative w-full cursor-text">
              <div className=" text-white rounded-2xl shadow w-full bg-[#00000099] backdrop-blur-xl">
                <div className="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                  <h3
                    className={ locale === "ar" ? "text-3xl lg:m-[2vh] md:text-4xl lg:text-4xl  xl:text-6xl 4xl:text-7xl 5xl:text-8xl font-semibold " : "text-lg lg:m-[2vh] md:text-lg lg:text-lg  xl:text-4xl 4xl:text-7xl 5xl:text-8xl font-semibold " }
                    style={{ fontFamily: "var(--secondary-font)" }}
                  >
                    {modal.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="bg-gray-100 lg:m-[1vh] hover:bg-gray-300 text-green-600 rounded-lg text-sm p-1.5 inline-flex items-center "
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-[3vh] h-[3vh]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="space-y-15 overflow-y-auto max-h-[44vh] md:max-h-[56vh]">
                  {textWithNewLine.split("\n").map((line, index) => (
                    <p
                      key={index}
                      className="px-4 mx-[2vh] text-lg md:text-lg lg:text-xl xl:text-2xl 4xl:text-5xl 5xl:text-6xl mb-[2vh]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {/* <div className="flex items-start justify-between">
                  <div className="py-4 cursor-pointer"></div>
                  <Image
                    src="/images/infoIcon.png"
                    alt="Close"
                    width={
                      typeof window !== "undefined" && window.innerWidth >= 3840
                        ? 150
                        : window.innerWidth >= 2000
                        ? 80
                        : 50
                    }
                    height={
                      typeof window !== "undefined" && window.innerWidth >= 3840
                        ? 150
                        : window.innerWidth >= 2000
                        ? 80
                        : 50
                    }
                    className="absolute -ml-8 -mr-8 cursor-pointer"
                    quality={100}
                    onClick={() => onClose()}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Html>
  );
};

export default Modal;
