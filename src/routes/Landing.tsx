import FullWidthImage from '@/components/FullWidthImage';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/Text/Heading';
import Subheading from '@/components/Text/Subheading';
import BodyText from '@/components/Text/BodyText';
import PageTitle from '@/components/Text/PageTitle';
import Button from '@/components/global/Button';

export default function Landing() {
  return (
    <>
      <PageTitle text="Landing Page" />
      <div className="relative h-screen">
        <FullWidthImage
          src="/images/lp-1320.webp"
          alt="Desk full of people on their laptops from a top angle"
          srcSet="/images/lp-1320.webp 1320w, /images/lp-880.webp 800w, /images/lp-480.webp 480w"
          sizes="100vw"
        />
        <Card className="w-full absolute top-1/2 inset-x-0 -translate-y-1/2 ">
          <CardContent>
            <Subheading text="Find your perfect workspace" />
            <Heading text="Welcome to DSD Coworking" />
            <BodyText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod." />
            <Button text="Learn More" onClick={() => 1} color="indigo" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
