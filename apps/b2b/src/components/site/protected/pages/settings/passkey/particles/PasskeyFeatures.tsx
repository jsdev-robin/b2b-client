import { Badge } from '@repo/ui/components/badge';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { CheckCircle2, Fingerprint, Lock, Smartphone } from 'lucide-react';

const cardsData = [
  {
    icon: Fingerprint,
    title: 'Biometric Login',
    description:
      'Use your fingerprint or face recognition for instant, secure access',
    badgeText: 'Active',
    features: ['Touch ID & Face ID', 'Windows Hello', 'Android Biometrics'],
  },
  {
    icon: Smartphone,
    title: 'Cross-Device Sync',
    description: 'Your passkeys work seamlessly across all your devices',
    badgeText: 'Synced',
    features: [
      'iCloud Keychain',
      'Google Password Manager',
      '1Password & Bitwarden',
    ],
  },
  {
    icon: Lock,
    title: 'Enhanced Security',
    description:
      'Phishing-resistant authentication with public key cryptography',
    badgeText: 'Secure',
    features: ['No password leaks', 'Phishing protection', 'FIDO2 certified'],
  },
];

const PasskeyFeatures = () => {
  return (
    <ItemGroup className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((item, idx) => (
        <Item variant="muted" key={idx}>
          <ItemHeader>
            <ItemMedia variant="icon">
              <item.icon />
            </ItemMedia>
            <ItemActions>
              <Badge variant="secondary">{item.badgeText}</Badge>
            </ItemActions>
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemDescription>{item.description}</ItemDescription>
          </ItemContent>
          <ItemFooter>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {item.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </ItemFooter>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default PasskeyFeatures;
