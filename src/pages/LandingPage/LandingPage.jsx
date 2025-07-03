import './LandingPage.scss';
import TypedText from '../../components/TypeEffect/TypeEffect';

function LandingPage() {
  return (
    <div>
      <TypedText className="about__type" />
      <div className="about">
        <p className="about__description about__description--mobile">
          Hello! I&apos;m Anoshka!
        </p>
        {/* <p className="about__description about__description--mobile">
          I have been a Python programmer in the Animation industry for 4 years.
          By developing multiple tools for artists and clients, I realised that
          I am passionate about programming and developing user interfaces. I
          enjoy debugging and building software based on user requirements, and
          I believe that my previous experience in the fast paces animation
          industry, working directly with my clients will enhance my skills as a
          software developer.
        </p>
        <p className="about__description about__description--tablet">
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
          developer. My experiences are a combination of creative problem
          solving and collaborating with amazing and motivated people. I
          can&apos;t wait to bring my skills to my work as a developer!
        </p> */}
        <p className="about__description about__description--desktop">
          Hi, I’m Anoshka, a programmer and Rigging/Creature TD with 4+ years of
          experience in animation and tech art. I started off as an artist, but
          quickly got enveloped in writing tools, automating workflows, and
          generally making life easier for the teams around me. That curiosity
          grew into a full-blown passion for code - Python, C++, Maya APIs,
          Houdini magic, and Unreal Engine wizardry. In 2024, I received a
          scholarship to study software engineering and took the leap into
          formal development training. My work now lives at the intersection of
          animation, logic, and gameplay, and I’m currently experimenting with
          C++ plugins in Unreal and building a Unity game that I would love to
          start playing. Outside work, I hang out with rescue dogs and get lost
          in my local library, usually hunting for stories steeped in mythology
          or ancient civilisations. I’m not a hardcore gamer, but I love getting
          pulled into worlds like Diablo, Helldivers, or Hogwarts Legacy - the
          kind you can sink into for a while and forget what time it is. Whether
          I’m working on pipelines or prototyping new tools, I’m happiest when
          I’m solving problems, writing clean code, and helping build
          experiences that make people feel something. If you have a project in
          mind, feel free to get in touch, and lets make something cool!
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
