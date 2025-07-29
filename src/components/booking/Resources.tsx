import FullWidthImage from '../FullWidthImage';
import Button from '../global/Button';
import Heading from '../Text/Heading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

function Resources() {
  // const test = async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  //   const data = await response.json();
  //   console.log(data);
  // }
  return (
    <Card>
      <Heading text="Rent Office Space" />
      <Card>
        <CardContent>
          {/*To be pulled from DB: Img src, Alt */}
          <CardContent>
            <FullWidthImage src="/images/Grey.jpg" alt="Grey block" />
          </CardContent>
          <CardContent>
            {/*Pull from DB: Card Title, may need some id for room to be passed into button fn */}
            <CardHeader className="flex">
              <CardTitle>Suite 100: DB</CardTitle>

              <Button text="Reserve" onClick={() => {}} color="indigo" />
            </CardHeader>
            {/*Pull from DB: Size, Available date, Lease rate*/}
            <CardDescription className="flex">
              <div>
                <p className="font-bold">Size</p>
                <p>6000sqft: DB</p>
              </div>
              <div>
                <p className="font-bold">Available</p>
                <p>September 19, 2025: DB</p>
              </div>
              <div>
                <p className="font-bold">Lease Rate</p>
                <p>$USD: DB</p>
              </div>
            </CardDescription>
          </CardContent>
        </CardContent>
      </Card>
    </Card>
  );
}

export default Resources;
