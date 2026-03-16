import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@repo/ui/components/item';

const ProfileDangerZone = () => {
  return (
    <Card className="bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription className="text-destructive">
          Irreversible actions. Proceed with caution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-4">
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Deactivate Account</ItemTitle>
              <ItemDescription>
                Your account will be disabled but not deleted
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button>Deactivate Account</Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Delete Account</ItemTitle>
              <ItemDescription>
                Permanently delete your account and all data
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="destructive">Delete Account</Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ProfileDangerZone;
