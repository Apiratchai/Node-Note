"use client"; // this will be rendered by client side
import Typewriter from "typewriter-effect";

export default function TypewriterTitle() {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Note taking app with node visualization")
          .start();
      }}
    />
  );
}
