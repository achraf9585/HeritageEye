import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CameraControls, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import html2canvas from "html2canvas";

import Image from "next/image";
import { useRouter } from "next/router";

import questions from "../../../data/house-of-allegiance-quiz.json";
interface IPortalProps {
  cameraControlsRef: React.RefObject<CameraControls>;
  //onClick: (arg0: number) => void;
}

function Menu({ cameraControlsRef }: IPortalProps) {
  //auto rotate the camera
  const [cameraRotationOn, setCameraRotationOn] = useState(false);
  const [previousControlsEnabled, setPreviousControlsEnabled] = useState(false);
  const { locale } = useRouter();

  useEffect(() => {
    function handleClick() {
      if (cameraRotationOn) {
        setCameraRotationOn(false);
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [cameraRotationOn]);

  useFrame(() => {
    if (cameraRotationOn) {
      if (cameraControlsRef.current) {
        setPreviousControlsEnabled(cameraControlsRef.current.enabled);
        cameraControlsRef.current.enabled = false;
        cameraControlsRef.current.rotate(-0.007, 0, false);
      }
    } else {
      if (cameraControlsRef.current && previousControlsEnabled) {
        cameraControlsRef.current.enabled = true;
      }
    }
  });

  const handle360ButtonClick = useCallback(() => {
    setCameraRotationOn((prev) => !prev);
  }, [setCameraRotationOn]);

  //==================

  function toggleFullScreen() {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(() => {
        // err) => {
        /*console.log(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );*/
      });
    } else {
      document.exitFullscreen();
    }
  }
  //Map Modal Start ==============================================================
  const [isModalMapVisible, setIsModalMapVisible] = useState(false);
  const handleModalMapClick = () => {
    setIsModalMapVisible(true);
    if (cameraControlsRef.current) {
      cameraControlsRef.current.enabled = false;
    }
  };
  const handleCloseModalMapClick = () => {
    setIsModalMapVisible(false);
  };

  //Map Modal End ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  //ScreenShot Modal Start ==============================================================
  const [isModalScreenShotVisible, setIsModalScreenShotVisible] =
    useState(false);
  const handleModalScreenShotClick = async () => {
    try {
      const element = document.getElementById("capture");

      setIsModalScreenShotVisible(true);
      if (!element) return;
      await html2canvas(element).then((canvas) => {
        const url = canvas.toDataURL();
        const link = document.createElement("a");

        link.download = "screenshot Heritage eye.png";
        link.href = url;
        link.click();
      });

      setTimeout(() => {
        handleCloseModalScreenShotClick();
      }, 1200);
    } catch (error) {
      //console.error("Error sharing to Facebook:", error);
      handleCloseModalScreenShotClick();
    }
  };

  const handleCloseModalScreenShotClick = () => {
    setIsModalScreenShotVisible(false);
  };
  //ScreenShot Modal End ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  //Form Modal Start ==============================================================
  const [isModalFormVisible, setIsModalFormVisible] = useState(false);
  //const currentResponseList = null;
  /*
  const handleModalFormClick = () => {
    setIsModalFormVisible(true);
    setCurrentQuestionContent(questions[0].question);
  };*/

  const handleCloseModalFormClick = () => {
    setIsModalFormVisible(false);
  };

  const [selectedOptions, setSelectedOptions] = useState<
    { answerByUser: string }[]
  >([]);

  const handleAnswerOption = (answer: string) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [currentQuestionContent, setCurrentQuestionContent] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQues = currentQuestion - 1;

      setCurrentQuestionContent(questions[prevQues].question);
      prevQues >= 0 && setCurrentQuestion(prevQues);
    }
    if (currentQuestion == 1) {
      setIsButtonDisabled(true);
    }
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;

    setIsButtonDisabled(false);
    setCurrentQuestionContent(questions[nextQues].question);

    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSubmit = () => {
    //console.log(selectedOptions);
  };
  //Form Modal End ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  //Info Modal Start ====================================================================================
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false);
  const handleModalInfoClick = () => {
    setIsModalInfoVisible(true);
    if (cameraControlsRef.current) {
      cameraControlsRef.current.enabled = false;
    }
  };
  const handleCloseModalInfoClick = () => {
    setIsModalInfoVisible(false);
  };
  //Info Modal End ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  //ModalManager Start----------------------------
  const [t] = useTranslation();

  if (isModalMapVisible) {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.enabled = false;
    }

    return (
      <Html center>
        <div className="h-[80vh] w-[42vw] md:w-[44vw] 2xl:w-[48vw] position-unsed flex justify-center items-center -translate-y-[4vh] ltr:-translate-x-[18vw] ltr:sm:translate-x-[0vw] rtl:translate-x-[44vw] rtl:xl:translate-x-[48vw]">
          <div className="flex z-50 m-5 text-justify">
            <div
              id="defaultModal"
              aria-hidden="true"
              className=" top-0 left-0 right-0 z-50  md:inset-0 h-modal w-full"
            >
              <div className="relative w-full ">
                <div className=" text-white rounded-2xl 4xl:rounded-3xl shadow w-full bg-[#00000099] backdrop-blur-xl">
                  <div className="flex items-start justify-between p-4 rounded-t ">
                    <h3
                      className="text-xl md:m-[2vh] md:text-2xl  xl:text-4xl 3xl:text-4xl 4xl:text-6xl 5xl:text-8xl font-semibold"
                      style={{ fontFamily: "var(--secondary-font)" }}
                    >
                      {t("menu.map.title")}
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseModalMapClick}
                      className="bg-gray-100 lg:m-[1vh] hover:bg-gray-300 text-green-600 rounded-lg text-sm p-1.5 inline-flex items-center"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-[3vh] h-[3vh] 4xl:w-[5vh] 4xl:h-[5vh]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-6  overflow-y-auto ">
                    <Image
                      alt="Map"
                      src="/images/plan.png"
                      width={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 500
                          : window.innerWidth >= 2000
                          ? 400
                          : window.innerWidth >= 750
                          ? 350
                          : 200
                      }
                      height={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 500
                          : window.innerWidth >= 2000
                          ? 400
                          : window.innerWidth >= 750
                          ? 350
                          : 200
                      }
                      useMap="#workmap"
                    />
                    <map name="workmap" className="cursor-pointer bg-red-200">
                      <area
                        shape="rect"
                        coords="34,44,270,350"
                        alt="Computer"
                        tabIndex={0}
                        onPointerDown={() => {
                          // onClick(2);
                        }}
                      />

                      <area
                        shape="rect"
                        coords="290,172,333,250"
                        alt="Phone"
                        tabIndex={0}
                        onPointerDown={() => {
                          // onClick(3);
                        }}
                      />
                      <area
                        shape="circle"
                        coords="337,300,44"
                        alt="Cup of coffee"
                        tabIndex={0}
                        onPointerDown={() => {
                          // onClick(4);
                        }}
                      />
                    </map>

                    <div className="flex items-start justify-between">
                      <div className="py-2 "></div>
                      <Image
                        src="/images/estefhem.png"
                        alt="Close"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        className="absolute -ml-[5vh] -mr-[5vh] cursor-pointer"
                        quality={100}
                        onClick={handleCloseModalMapClick}
                        title="Close"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    );
  }

  if (isModalFormVisible) {
    return (
      <Html center>
        <div
          className="h-screen w-screen 4xl:w-[104vw] p-[10vh+10vw]  xl:p-[15vh+30vw] position-unset ltr:xl:-translate-y-[5vh] rtl:translate-x-[50vh]  rtl:xl:translate-x-[210vh] rtl:xl:-translate-y-[15vh] rtl:2xl:-translate-y-[10vh]  rtl:3xl:-translate-y-[5vh] rtl:4xl:translate-x-[180vh]"
          dir="ltr"
        >
          <div className="flex z-50 m-5 text-justify">
            <div
              id="defaultModal"
              aria-hidden="true"
              className=" top-0 left-0 right-0 z-50  md:inset-0 h-modal w-full"
            >
              <div className="relative w-full ">
                <div className=" text-white rounded-2xl 4xl:rounded-3xl shadow w-full bg-[#00000099] backdrop-blur-xl">
                  <div className="flex items-start justify-between p-4 rounded-t ">
                    <h3
                      className="text-xl md:m-[2vh] md:text-2xl  xl:text-4xl 3xl:text-4xl 4xl:text-6xl 5xl:text-8xl font-semibold"
                      style={{ fontFamily: "var(--secondary-font)" }}
                    >
                      Form
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseModalFormClick}
                      className="bg-gray-100 hover:bg-gray-300 text-green-600 rounded-lg text-sm p-1.5 inline-flex items-center"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-[3vh] h-[3vh] 4xl:w-[5vh] 4xl:h-[5vh]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col items-start mx-[2vh]">
                      <h4 className="text-lg 4xl:ml-[3vh] m-[1vh] md:text-md xl:text-xl  4xl:text-5xl 5xl:text-6xl  text-white/60">
                        Question {currentQuestion + 1} of {questions.length}
                      </h4>
                      <div className="text-md 4xl:ml-[3vh] m-[1vh] md:text-lg   xl:text-2xl  4xl:text-4xl 5xl:text-6xl text-white ">
                        {currentQuestionContent}
                      </div>
                      {questions[currentQuestion].answerOptions.map(
                        (answer, index) => (
                          <div
                            key={index}
                            className="flex items-center  cursor-pointer  "
                            onClick={() => handleAnswerOption(answer.answer)}
                          >
                            <input
                              type="radio"
                              name={answer.answer}
                              value={answer.answer}
                              onChange={() => handleAnswerOption(answer.answer)}
                              checked={
                                answer.answer ===
                                selectedOptions[currentQuestion]?.answerByUser
                              }
                              className="w-6 h-6 hidden peer "
                            />
                            <p className=" 4xl:text-4xl 5xl:text-6xl text-white  m-[1vh] peer-checked:border-green-600 peer-checked:bg-green-600 w-[60vw] md:w-[34vw] 4xl:w-[39vw] py-3 pl-2  space-x-2 border-2 border-black rounded-xl bg-black opacity-60 4xl:ml-[3vh]  4xl:my-[1vh]">
                              {answer.answer}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex justify-between w-[29vh] lg:w-[69vh] mt-4 mx-[2vh] text-white 4xl:text-4xl 5xl:text-6xl 4xl:ml-[3vh] ">
                      {isLastQuestion ? (
                        <>
                          <button
                            disabled={isButtonDisabled}
                            onClick={handlePrevious}
                            className="w-[49%] py-3 bg-green-600 rounded-lg 4xl:rounded-2xl 4xl:py-[2vh]"
                          >
                            Previous
                          </button>
                          <form className="w-[49%]">
                            <button
                              disabled={isButtonDisabled}
                              onClick={handleSubmit}
                              className="w-[100%] py-3 bg-indigo-600 rounded-lg 4xl:rounded-2xl 4xl:py-[2vh]"
                            >
                              Submit
                            </button>
                          </form>
                        </>
                      ) : (
                        <>
                          <button
                            disabled={isButtonDisabled}
                            onClick={handlePrevious}
                            className="w-[49%] py-3 bg-green-600 rounded-lg 4xl:rounded-2xl 4xl:py-[2vh]"
                          >
                            Previous
                          </button>
                          <button
                            onClick={handleNext}
                            className="w-[49%] py-3 bg-green-600 rounded-lg 4xl:rounded-2xl 4xl:py-[2vh]"
                          >
                            Next
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="py-4 "></div>
                      <Image
                        src="/images/estefhem.png"
                        alt="Close"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 220
                            : window.innerWidth >= 2000
                            ? 130
                            : window.innerWidth >= 1000
                            ? 70
                            : 70
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 220
                            : window.innerWidth >= 2000
                            ? 130
                            : window.innerWidth >= 1000
                            ? 70
                            : 70
                        }
                        className="absolute left-0 -translate-x-[4vh] cursor-pointer"
                        quality={100}
                        onClick={handleCloseModalFormClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    );
  }

  if (isModalScreenShotVisible) {
    return (
      //<div className='w-max fixed z-60 backdrop-blur'>
      <Html center>
        {/* <div
          id="alert-3"
          className="flex translate-x-[30vh] -translate-y-[40vh] p-4 mb-4 w-[60vh] text-green-800 rounded-lg bg-green-50 "
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium">
            {t("menu.screenshot.textpopup")}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-3"
            aria-label="Close"
            onClick={handleCloseModalScreenShotClick}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div> 
        <div className="px-[3vh] py-[1vh] text-xl -translate-x-[8vh] font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse ">
          loading...
        </div>*/}
        <div
          role="status"
          className="backdrop-blur-sm rounded-xl flex justify-center items-center rtl:translate-x-[18vw] rtl:md:translate-x-[5vw]"
        >
          <svg
            aria-hidden="true"
            className="w-[8vh] h-[8vh] mr-2 text-gray-300 animate-spin dark:text-gray-600 fill-green-600 "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        {/* 
        <div className="h-screen w-screen 4xl:w-[104vw] p-[10vh+10vw]  xl:p-[15vh+30vw] position-unset ltr:xl:-translate-y-[5vh] rtl:translate-x-[50vh]  rtl:xl:translate-x-[210vh] rtl:xl:-translate-y-[15vh] rtl:2xl:-translate-y-[10vh]  rtl:3xl:-translate-y-[5vh] rtl:4xl:translate-x-[180vh]">
          <div className="flex z-50 m-5 text-justify">
            <div
              id="defaultModal"
              aria-hidden="true"
              className=" top-0 left-0 right-0 z-50  md:inset-0 h-modal w-full"
            >
              <div className="relative w-full ">
                <div className=" text-white rounded-2xl 4xl:rounded-3xl shadow w-full bg-[#00000099] backdrop-blur-xl">
                  <div className="flex items-start justify-between p-4 rounded-t ">
                    <h3
                      className="text-xl md:m-[2vh] md:text-2xl  xl:text-4xl 3xl:text-4xl 4xl:text-6xl 5xl:text-8xl font-semibold"
                      style={{ fontFamily: "var(--secondary-font)" }}
                    >
                      {t("menu.screenshot.title")}
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseModalScreenShotClick}
                      className="bg-gray-100 lg:m-[1vh] hover:bg-gray-300 text-green-600 rounded-lg text-sm p-1.5 inline-flex items-center"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-[3vh] h-[3vh] 4xl:w-[5vh] 4xl:h-[5vh]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div
                    dir="ltr"
                    className="ltr:xl:-mx-[4vh] ltr:2xl:-mx-[4vh] ltr:3xl:mx-[0vh]  rtl:xl:-mx-[5vh] rtl:2xl:-mx-[5vh] rtl:3xl:-mx-[0vh] rtl:4xl:-mx-[0vh]  left-0 right-0 overflow-y-auto"
                  >
                    <Image
                      src={dataUrl}
                      alt="ScreenShot"
                      width={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 1380
                          : window.innerWidth >= 2000
                          ? 880
                          : window.innerWidth >= 1000
                          ? 420
                          : 120
                      }
                      height={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 1380
                          : window.innerWidth >= 2000
                          ? 880
                          : window.innerWidth >= 1000
                          ? 420
                          : 120
                      }
                      className="rounded-lg 4xl:rounded-2xl translate-x-[14vh]  4xl:translate-x-[2vh] mr-[1vh]"
                    />
                  </div>
                  <div className="p-6 space-y-6  overflow-y-auto ">
                    <p className="text-sm md:text-xl 4xl:text-5xl 5xl:text-7xl m-[1vh] leading-relaxed">
                      {t("menu.screenshot.description")}
                    </p>
                  </div>
                  <div className="sharing-buttons flex flex-wrap justify-center md:justify-start lg:justify-start items-center mx-[2vh] px-6">
                    <FacebookShareButton url={dataUrl}>
                      <FacebookIcon
                        size={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 130
                            : window.innerWidth >= 2000
                            ? 80
                            : window.innerWidth >= 1000
                            ? 42
                            : 42
                        }
                        round
                      ></FacebookIcon>
                    </FacebookShareButton>

                    <TwitterShareButton url={dataUrl}>
                      <TwitterIcon
                        className="m-[1vh]"
                        size={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 130
                            : window.innerWidth >= 2000
                            ? 80
                            : window.innerWidth >= 1000
                            ? 42
                            : 42
                        }
                        round
                      ></TwitterIcon>
                    </TwitterShareButton>

                    <LinkedinShareButton url={dataUrl}>
                      <LinkedinIcon
                        size={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 130
                            : window.innerWidth >= 2000
                            ? 80
                            : window.innerWidth >= 1000
                            ? 42
                            : 42
                        }
                        round
                      ></LinkedinIcon>
                    </LinkedinShareButton>
                  </div>
                  <div className="flex justify-center items-center p-8">
                    <button
                      type="button"
                      onClick={takeScreenShot}
                      className="bg-orange-100 hover:bg-orange-200 text-green-700 font-bold py-3 px-6 rounded inline-flex items-center 4xl:text-5xl  5xl:text-6xl 4xl:rounded-xl 4xl:p-[1vh]"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        className="fill-current w-4 h-4 mx-1 4xl:w-[8vh] 4xl:h-[3vh]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span>{t("menu.screenshot.download")}</span>
                    </button>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="py-4 cursor-pointer"></div>
                    <Image
                      src="/images/infoIcon.png"
                      alt="Close"
                      width={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 220
                          : window.innerWidth >= 2000
                          ? 130
                          : window.innerWidth >= 1000
                          ? 70
                          : 70
                      }
                      height={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 220
                          : window.innerWidth >= 2000
                          ? 130
                          : window.innerWidth >= 1000
                          ? 70
                          : 70
                      }
                      className="absolute -ml-8 -mr-8"
                      quality={100}
                      onClick={handleCloseModalScreenShotClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        */}
      </Html>
    );
  }

  if (isModalInfoVisible) {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.enabled = false;
    }

    return (
      <Html center>
        <div className="z-50 h-[80vh] w-[42vw] md:w-[44vw] 2xl:w-[48vw] position-unsed flex justify-center items-center -translate-y-[4vh] rtl:translate-x-[44vw] rtl:xl:translate-x-[48vw]">
          <div className="flex z-50 m-5 text-justify">
            <div
              id="defaultModal"
              aria-hidden="true"
              className=" top-0 left-0 right-0 z-50  md:inset-0 h-modal w-full"
            >
              <div className="relative w-full cursor-text">
                <div className=" text-white rounded-2xl 4xl:rounded-3xl shadow  bg-[#00000099] backdrop-blur-xl w-[60vw] md:w-full">
                  <div className="flex items-start justify-between p-3 rounded-t ">
                    <h3
                      className="text-lg md:m-[2vh] md:text-xl  xl:text-3xl 3xl:text-2xl 4xl:text-5xl 5xl:text-6xl font-semibold"
                      style={{ fontFamily: "var(--secondary-font)" }}
                    >
                      {t("menu.info.title")}
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseModalInfoClick}
                      className="bg-gray-100 p-2 4xl:p-3 lg:m-[2vh] hover:bg-gray-300 text-green-600 rounded-lg text-sm  inline-flex items-center"
                      data-modal-hide="defaultModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-[2vh] h-[2vh] 4xl:w-[3vh] 4xl:h-[3vh]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="text-md xl-text-lg 4xl:text-2xl 5xl:text-4xl grid grid-cols-2 grid-rows-5  py-1 4xl:ml-[2vh] mb-[1vh]">
                    <div className="px-[2vh] py-[1vh] md:px-[6vh] inline-flex text-center items-center">
                      <Image
                        alt="Map"
                        src="/images/estefhem.png"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        priority
                      />
                    </div>
                    <div className=" ltr:-translate-x-[3vh] ltr:4xl:-translate-x-[4vh]  inline-flex text-center items-center">
                      {t("menu.info.quiz")}
                    </div>
                    <div className="px-[2vh] py-[1vh] md:px-[6vh] inline-flex text-center items-center">
                      <Image
                        alt="Info"
                        src="/images/taajob.png"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        priority
                      />
                    </div>
                    <div className=" ltr:-translate-x-[3vh] ltr:4xl:-translate-x-[4vh]  inline-flex text-center items-center">
                      {t("menu.info.info")}
                    </div>
                    <div className="px-[2vh] py-[1vh] md:px-[6vh] inline-flex text-center items-center">
                      <Image
                        alt="Video"
                        src="/images/play.png"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        priority
                      />
                    </div>
                    <div className=" ltr:-translate-x-[3vh] ltr:4xl:-translate-x-[4vh]  inline-flex text-center items-center">
                      {t("menu.info.video")}
                    </div>
                    <div className="px-[2vh] py-[1vh] md:px-[6vh] inline-flex text-center items-center">
                      <Image
                        alt="Form"
                        src="/images/doc.png"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        priority
                      />
                    </div>
                    <div className=" ltr:-translate-x-[3vh] ltr:4xl:-translate-x-[4vh]  inline-flex text-center items-center">
                      {t("menu.info.form")}
                    </div>
                    <div className="px-[2vh] py-[1vh] md:px-[6vh] inline-flex text-center items-center">
                      <Image
                        alt="Navigation"
                        src="/images/navigation.png"
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        height={
                          typeof window !== "undefined" &&
                          window.innerWidth >= 3840
                            ? 150
                            : window.innerWidth >= 2000
                            ? 80
                            : 50
                        }
                        priority
                      />
                    </div>
                    <div className=" ltr:-translate-x-[3vh] ltr:4xl:-translate-x-[4vh]  inline-flex text-center items-center">
                      {t("menu.info.navigation")}
                    </div>
                  </div>
                  <div className="flex justify-center text-center items-center p-3 px-8">
                    <button
                      onClick={handleCloseModalInfoClick}
                      className="bg-orange-100 hover:bg-orange-200 text-green-700 font-bold rounded w-[20vw] h-[5vh] inline-flex text-center items-center 4xl:text-2xl  5xl:text-4xl 4xl:rounded-xl"
                    >
                      <span className="text-center flex-grow justify-center items-center">
                        {t("cancel")}
                      </span>
                    </button>
                  </div>
                  {/* <div className="flex items-start justify-between">
                    <div className="py-2"></div>
                    <Image
                      src="/images/infoIcon.png"
                      alt="Close"
                      width={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 150
                          : window.innerWidth >= 2000
                          ? 80
                          : 50
                      }
                      height={
                        typeof window !== "undefined" &&
                        window.innerWidth >= 3840
                          ? 150
                          : window.innerWidth >= 2000
                          ? 80
                          : 50
                      }
                      className="absolute -ml-[3vh] -mr-[3vh] cursor-pointer"
                      quality={100}
                      onClick={handleCloseModalInfoClick}
                      title="Close"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    );
  }

  if (cameraControlsRef.current) {
    if (!isModalInfoVisible && !isModalMapVisible) {
      if (cameraControlsRef.current) {
        cameraControlsRef.current.enabled = true;
      }
    }
  }

  return (
    <Html center className="invisible z-50" style={{ direction: "ltr" }}>
      <div className="z-50 fixed bottom-0 left-0 right-0 flex justify-center w-[44vh] md:w-[46vh] 3xl:w-[48vh] h-[8vh] rounded bg-[#00000099] backdrop-blur-xl visible -translate-x-[22vh] translate-y-[37vh] md:translate-y-[36vh] xl:translate-y-[42vh] ">
        <div className="fixed flex justify-center inset-0 items-center space-x-[2vh]">
          {/* <button
            onClick={handleModalMapClick}
            className="bg-transparent w-[6vh] h-[6vh] ml-[2vh]"
          >
            <Image
              alt="Map"
              src="/images/map.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 30
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 30
              }
              priority
            />
          </button>
          <Image
            alt="Pipe"
            src="/images/line.png"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            priority
          /> */}
          <button
            onClick={handleModalScreenShotClick}
            //onClick={takeScreenShot}
            className="bg-transparent  w-[6vh] h-[6vh] ml-[2vh]"
          >
            <Image
              alt="Screenshot"
              src="/images/shape.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 105
                  : window.innerWidth >= 2000
                  ? 70
                  : window.innerWidth >= 750
                  ? 46
                  : 30
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 105
                  : window.innerWidth >= 2000
                  ? 70
                  : window.innerWidth >= 750
                  ? 46
                  : 30
              }
              priority
            />
          </button>
          <Image
            alt="Pipe"
            src="/images/line.png"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            priority
          />
          <button
            onClick={toggleFullScreen}
            className="bg-transparent  w-[6vh] h-[6vh]"
          >
            <Image
              className=""
              alt="FullScreen"
              src="/images/Fullscreen.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 35
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 35
              }
              priority
            />
          </button>
          <Image
            alt="Pipe"
            src="/images/line.png"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            priority
          />
          <button
            onClick={handle360ButtonClick}
            className="bg-transparent  w-[6vh] h-[6vh] "
          >
            <Image
              alt="360"
              src="/images/Vector.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 33
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 33
              }
              priority
            />
          </button>
          <Image
            alt="Pipe"
            src="/images/line.png"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            priority
          />
          {/*  
          <button onClick={handleModalFormClick} className="bg-transparent">
            <Image
              alt="Quest"
              src="/images/question-circle.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 60
                  : 40
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 60
                  : 40
              }
              priority
            />
          </button>
          <Image
            alt="Pipe"
            src="/images/line.png"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            priority
          />
          */}
          <button
            onClick={handleModalInfoClick}
            className="bg-transparent w-[6vh] h-[6vh] "
          >
            <Image
              alt="Info"
              src="/images/info-circle.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 35
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 35
              }
              priority
            />
          </button>
          <Image
            alt="Pipe"
            src="/images/line.png"
            width={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            height={
              typeof window !== "undefined" && window.innerWidth >= 3840
                ? 4
                : window.innerWidth >= 2000
                ? 2.5
                : window.innerWidth >= 750
                ? 1.5
                : 1
            }
            priority
          />
          <button
            className="bg-transparent w-[6vh] h-[6vh] -translate-x-[1vh]"
            onClick={() => (window.location.href = "/" + locale)}
          >
            <Image
              alt="Exit"
              src="/images/cross.png"
              width={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 35
              }
              height={
                typeof window !== "undefined" && window.innerWidth >= 3840
                  ? 120
                  : window.innerWidth >= 2000
                  ? 80
                  : window.innerWidth >= 750
                  ? 50
                  : 35
              }
              priority
            />
          </button>
        </div>
      </div>
    </Html>
  );
  //ModalManager End ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
}

export default Menu;
