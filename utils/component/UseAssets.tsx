import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';

interface Props {
  width?: number;
  height?: number;
}

export default function AdaptiveIcon({ width, height }: Props) {
  const [assets, error] = useAssets([require('~/assets/adaptive-icon.png')]);

  return assets ? <Image source={assets[0]} style={{ width, height }} /> : null;
}
