import { Hero } from '../sections/Hero';
import { Stats } from '../sections/Stats';
import { Services } from '../sections/Services';
import { Process } from '../sections/Process';
import { Workshop } from '../sections/Workshop';
import { Gallery } from '../sections/Gallery';
import { Future } from '../sections/Future';
import { Fleet } from '../sections/Fleet';
import { Notes } from '../sections/Notes';
import { Partners } from '../sections/Partners';
import { Contact } from '../sections/Contact';
import { ProgressRail } from '../components/ProgressRail';

export default function Home() {
  return (
    <>
      <ProgressRail />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Workshop />
      <Gallery />
      <Future />
      <Fleet />
      <Notes />
      <Partners />
      <Contact />
    </>
  );
}
