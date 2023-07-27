import React, {
  useEffect,
  useState,
  Children,
  cloneElement,
  useRef,
} from "react";
import "./myCarousel.css";

const SLIDE_WIDTH = 800;
const TRANSITION_DURATION = 1000;
const SLEEP_SLIDER = 5000;

function MyCarousel({ children }) {
  const [slides, setSlides] = useState([]);
  const [offset, setOffset] = useState(0);
  const [transitionD, setTransitionD] = useState(TRANSITION_DURATION);
  const [CaruselWidth, setCaruselWidth] = useState(SLIDE_WIDTH);
  const [sleepTime, setSleepTime] = useState(SLEEP_SLIDER);
  const TimerRef = useRef(-1);
  const winElemRef = useRef();

  //Ресайз окна карусели
  useEffect(() => {
    const resizeHandler = () => {
      const _width = winElemRef.current.offsetWidth;
      setTransitionD(0);
      // console.log(offsetRef.current);
      setCaruselWidth(_width);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  //Клонируем первый элемент для эффекта бесконечности
  useEffect(() => {
    setOffset(0.0001);

    setSlides(() => {
      const newSlides = Children.map(children, (child, indx) => {
        return cloneElement(child, {
          key: { indx },
          style: {
            height: "100%",
            // minWidth: `${SLIDE_WIDTH}px`,
            // maxWidth: `${SLIDE_WIDTH}px`,
            minWidth: `${CaruselWidth}px`,
            maxWidth: `${CaruselWidth}px`,
          },
        });
      });
      const _Slides = [...newSlides, cloneElement(newSlides[0], { key: 8456 })];
      return _Slides;
    });
  }, [children, CaruselWidth]);

  //Запустить таймер с переходами по картинкам
  useEffect(() => {
    if (TimerRef.current !== -1) {
      clearInterval(TimerRef.current);
    }
    TimerRef.current = setInterval(() => {
      if (sleepTime === 0 && transitionD === 0) setSleepTime(SLEEP_SLIDER);
      if (transitionD === 0) setTransitionD(TRANSITION_DURATION);
      //      if (offset < SLIDE_WIDTH * (slides.length - 1)) {
      if (offset < CaruselWidth * (slides.length - 1)) {
        setOffset((current) => {
          //          const newCurrent = current + SLIDE_WIDTH;
          const newCurrent = current + CaruselWidth;
          // console.log(newCurrent);

          return newCurrent;
        });
      } else {
        //        if (offset >= SLIDE_WIDTH * (slides.length - 1)) {
        if (offset >= CaruselWidth * (slides.length - 1)) {
          setOffset(0);
          setTransitionD(0);
          setSleepTime(0);
        }
      }
    }, sleepTime);

    return () => {
      clearInterval(TimerRef.current);
    };
  }, [offset, slides.length, transitionD, CaruselWidth, sleepTime]);

  return (
    <>
      <div className="mycarousel" ref={winElemRef}>
        <div
          className="carousel-contain"
          style={{
            // width: { CaruselWidth },
            transitionDuration: `${transitionD}ms`,
            transform: `translateX(${-offset}px)`,
          }}
        >
          {slides}
        </div>
      </div>
    </>
  );
}

export default React.memo(MyCarousel);
