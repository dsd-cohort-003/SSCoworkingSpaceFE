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
      <div>
        <div className="relative h-screen">
          <FullWidthImage
            src="/images/lp-1320.webp"
            alt="Desk full of people on their laptops from a top angle"
            srcSet="/images/lp-1320.webp 1320w, /images/lp-880.webp 800w, /images/lp-480.webp 480w"
            sizes="100vw"
          />
        </div>
        <Card className="w-[calc(100%-40px)] sm:w-96 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 sm:left-5 sm:-translate-x-0">
          <CardContent className="flex flex-col gap-y-2">
            <Subheading text="Find your perfect workspace" />
            <Heading text="Welcome to DSD Coworking" />
            <BodyText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod." />
            <Button text="Learn More" onClick={() => 1} color="indigo" />
          </CardContent>
        </Card>
        {/* Image with text section */}
        <div className="flex flex-col sm:flex-row px-5 sm:px-0">
          <div className="my-auto min-h-72 flex flex-1 flex-col gap-y-2 justify-center sm:px-5">
            <Subheading text="Find your perfect workspace" />
            <Heading text="Welcome to DSD Coworking" />
            <BodyText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod." />
            <Button text="Learn More" onClick={() => 1} color="indigo" />
          </div>
          <div className="flex-1">
            <FullWidthImage src="/images/Grey.jpg" alt="Grey image" />
          </div>
        </div>
        {/*Multi-image section w/ Header */}
        <div className="bg-gray-50">
          <div className="flex justify-center py-5">
            <Heading text="Information" />
          </div>

          <div className="flex flex-col sm:flex-row px-5 gap-5 sm:max-w-[100vw]">
            <div className="flex-1">
              <FullWidthImage src="/images/Grey.jpg" alt="Grey image" />
            </div>

            <div className="flex-1">
              <FullWidthImage
                src="/images/Grey.jpg"
                alt="Grey image"
                className="flex-1"
              />
            </div>

            <div className="flex-1">
              <FullWidthImage src="/images/Grey.jpg" alt="Grey image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
