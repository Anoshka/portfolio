import Typewriter from "typewriter-effect";
import "./TypeEffect.scss";

function TypedText() {
  return (
    <div className="typed-text">
      <Typewriter
        options={{
          strings: ["hello!", "I'm Anoshka!", "Welcome to my portfolio!"],
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 25,
        }}
      />
    </div>
  );
}

export default TypedText;
