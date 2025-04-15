import './LandingPage.scss';
import TypedText from '../../components/TypeEffect/TypeEffect';

function LandingPage() {
  return (
    <>
      <TypedText className="about__type" />
      <p className="about__description">
        Hello! I&apos;m Anoshka! I&apos;m a programmer with over four years of
        experience as a Rigging/Creature Technical Director in the animation
        industry. I started off as an artist and quickly discovered how much I
        love developing tools to support my teammates, and make workflows more
        efficient. I continued to develop my interests by taking on more
        technical work, and adding more languages to my stack. I eventually
        joined my studios pipeline team and helped develop scalable tools,
        plugins and automations with Python and C++ within Unreal Engine,
        Autodesk Maya and SideFX Houdini. In 2024, I received a scholarship to
        get my diploma in software engineering, and strengthen my skills as a
        developer. My experiences are a combination of creative problem solving
        and collaborating with amazing and motivated people. I can&apos;t wait
        to bring my skills to my work as a developer!
      </p>
    </>
  );
}

export default LandingPage;
