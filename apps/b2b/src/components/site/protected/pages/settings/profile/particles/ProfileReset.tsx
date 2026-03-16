import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

const ProfileReset = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Tips</CardTitle>
        <CardDescription>
          See onboarding tips you might have missed.
        </CardDescription>
      </CardHeader>
      <CardFooter className=" justify-between">
        <CardDescription>
          Resetting will make all onboarding tips re-appear.
        </CardDescription>
        <CardAction>
          <Button>Reset</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default ProfileReset;
